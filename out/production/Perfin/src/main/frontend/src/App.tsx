import React from 'react';
import PageWrapper from "./components/PageWrapper/PageWrapper";
import TransactionSection from "./components/TransactionSection/TransactionSection";

const App = () => {
    return (
        <div className="App">
            <PageWrapper>
                <TransactionSection />
            </PageWrapper>
        </div>
    );
}

export default App;
