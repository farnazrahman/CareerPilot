function NavTabs({ activeTab, onTabChange }) {
    const makeButtonStyle = (tabName) => ({
        marginRight: "8px",
        padding: "8px 12px",
        backgroundColor: activeTab === tabName ? "#1976d2" : "#eeeeee",
        color: activeTab === tabName ? "white" : "black",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
    });

    return (
        <nav>
            <button
                style={makeButtonStyle("profile")}
                onClick={() => onTabChange("profile")}
            >
                Profile
            </button>
            <button
                style={makeButtonStyle("jobs")}
                onClick={() => onTabChange("jobs")}
            >
                Jobs
            </button>
            <button
                style={makeButtonStyle("tracker")}
                onClick={() => onTabChange("tracker")}
            >
                Tracker
            </button>
        </nav>
    );
}

export default NavTabs;