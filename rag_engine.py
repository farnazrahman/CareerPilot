class RAGEngine:
    def __init__(self):
        self.cv_stores = {}

    def create_cv_store(self, cv_id, cv_text):
        chunks = self._chunk_text(cv_text)
        self.cv_stores[cv_id] = chunks
        return cv_id

    def query_cv(self, cv_id, query, n_results=3):
        chunks = self.cv_stores.get(cv_id, [])
        if not chunks:
            return []

        query_words = set(query.lower().split())

        scored_chunks = []
        for chunk in chunks:
            chunk_words = set(chunk.lower().split())
            score = len(query_words.intersection(chunk_words))
            scored_chunks.append((score, chunk))

        scored_chunks.sort(reverse=True, key=lambda x: x[0])

        return [chunk for score, chunk in scored_chunks[:n_results]]

    def _chunk_text(self, text, chunk_size=500):
        words = text.split()
        chunks = []
        for i in range(0, len(words), chunk_size):
            chunk = " ".join(words[i:i + chunk_size])
            chunks.append(chunk)
        return chunks


rag_engine = RAGEngine()