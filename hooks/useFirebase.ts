import { initializeApp } from "@firebase/app";
import { useEffect, useState } from "react";

import firebaseConfig from "../firebase.client";

function useFirebase(){
  const [firebase, setFirebase] = useState(null);

  useEffect(() => {
    setFirebase(initializeApp(firebaseConfig));
  }, []);

  return firebase;
};

export default useFirebase;