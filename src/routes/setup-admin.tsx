import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { bootstrapAdmin } from "@/lib/bootstrap.functions";

// TEMPORARY one-time setup page. Deleted after use.
export const Route = createFileRoute("/setup-admin")({
  component: SetupAdmin,
});

function SetupAdmin() {
  const [result, setResult] = useState<string>("a executar…");

  useEffect(() => {
    bootstrapAdmin()
      .then((r) => setResult(JSON.stringify(r)))
      .catch((e) => setResult(`erro: ${String(e)}`));
  }, []);

  return <pre style={{ padding: 40 }}>{result}</pre>;
}
