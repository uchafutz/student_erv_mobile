import React from "react";
import Router from "./Router";
import { AuthContextProvider } from "./context/AuthContext";
import { QuestionsContextProvider } from "./context/QuestionsContext";

export default function App() {
  return (
    <AuthContextProvider>
      <QuestionsContextProvider>
        <Router/>
      </QuestionsContextProvider>
    </AuthContextProvider>
  );
}

