import { CraneIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";

const MaintenancePage = () => (
  <main className="flex h-dvh w-dvw flex-col items-center justify-center gap-6 p-6">
    <HugeiconsIcon icon={CraneIcon} style={{ width: 128, height: 128 }} />
    <div className="flex flex-col items-center justify-center gap-3">
      <h1 className="text-center font-medium text-3xl">
        Sorry! We're under maintenance
      </h1>
      <p className="text-center text-muted-foreground text-sm">
        Our website is currently undergoing scheduled maintenance. We will be
        back soon! Thank you for being so patient.
      </p>
    </div>
  </main>
);

export default MaintenancePage;
