import { getAnalytics } from "@firebase/analytics";
import { useEffect, useState } from "react";
import useFirebase from "./useFirebase";

function useAnalytics(){
    const firebase = useFirebase();
    const [analytics, setAnalytics] = useState(null);

    useEffect(() => {
      if(!firebase) return;
      setAnalytics(getAnalytics(firebase));
    }, [firebase]);

    return analytics;
};

export default useAnalytics;