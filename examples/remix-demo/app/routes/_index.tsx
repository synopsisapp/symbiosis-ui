import type { MetaFunction } from "@remix-run/node";
import { Button, Icon } from "@synopsisapp/symbiosis-ui";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="font-sans p-4">
      <h1>Symbiosis UI</h1>
      <Button label="Click me" leftIcon="calendar" rightIcon="calendar" />
      <div className="text-gray-500">
        <Icon name="dashboard" />
      </div>
    </div>
  );
}
