import chromadb
from sentence_transformers import SentenceTransformer
import os

class RAGEngine:
    def __init__(self):
        self.client = chromadb.Client()
        self.model = SentenceTransformer('all-MiniLM-L6-v2')
        self.collections = {}
    
    def create_cv_store(self, cv_id, cv_text):
        collection = self.client.create_collection(name=f"cv_{cv_id}")
        
        chunks = self._chunk_text(cv_text)
        
        embeddings = self.model.encode(chunks)
        
        collection.add(
            embeddings=embeddings.tolist(),
            documents=chunks,
            ids=[f"chunk_{i}" for i in range(len(chunks))]
        )
        
        self.collections[cv_id] = collection
        return cv_id
    
    def query_cv(self, cv_id, query, n_results=3):
        if cv_id not in self.collections:
            collection = self.client.get_collection(name=f"cv_{cv_id}")
            self.collections[cv_id] = collection
        else:
            collection = self.collections[cv_id]
        
        query_embedding = self.model.encode([query])
        
        results = collection.query(
            query_embeddings=query_embedding.tolist(),
            n_results=n_results
        )
        
        return results['documents'][0]
    
    def _chunk_text(self, text, chunk_size=500):
        words = text.split()
        chunks = []
        for i in range(0, len(words), chunk_size):
            chunk = ' '.join(words[i:i + chunk_size])
            chunks.append(chunk)
        return chunks

rag_engine = RAGEngine()