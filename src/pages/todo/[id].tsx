import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@clerk/nextjs";
import List from "@/components/list";

export default function Todo() {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [authToken, setAuthToken] = useState<string | null>("");
  const router = useRouter();
  const routerid = router.query.id;

  useEffect(() => {
    if (!routerid || !isLoaded) {
      return;
    }

    // FIXME: was trying to do something else here
    // and then decided against it; clean up later
    const validate = async () => {
      if (!userId) {
          router.push("/");
          return;
      }
      
      const token = await getToken({ template: "codehooks" });
      setAuthToken(token);
    }
    validate();
  }, [routerid, isLoaded, userId, getToken]);

  return (
    // FIXME
    <List isDone={false} updatedTodos={null}/>
  );
}