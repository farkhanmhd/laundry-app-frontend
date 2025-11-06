import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Layout = ({ children }: { children: React.ReactNode }) => (
  <section className="flex h-full w-full flex-col items-center gap-3">
    <div className="flex w-full max-w-3xl flex-2 flex-col gap-4 md:gap-6">
      <Tabs defaultValue="data">
        <TabsList className="gap-6 bg-background px-0">
          <TabsTrigger
            className="cursor-pointer border-none px-0 text-base dark:data-[state=active]:bg-background dark:hover:text-foreground"
            value="data"
          >
            Product Data
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer border-none px-0 text-base dark:data-[state=active]:bg-background dark:hover:text-foreground"
            value="qty"
          >
            Quantity
          </TabsTrigger>
          <TabsTrigger
            className="cursor-pointer border-none px-0 text-base dark:data-[state=active]:bg-background dark:hover:text-foreground"
            value="image"
          >
            Image
          </TabsTrigger>
        </TabsList>
        {children}
      </Tabs>
    </div>
  </section>
);

export default Layout;
