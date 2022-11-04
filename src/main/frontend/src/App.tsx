import React from 'react';
import PageWrapper from "./components/PageWrapper/PageWrapper";
import Transaction from "./components/Transaction/Transaction";

const App = () => {
  return (
    <div className="App">
      <PageWrapper>
          <Transaction />
      </PageWrapper>
    </div>
  );
}

export default App;
