import PageLayout from "./../Layout/PageLayout";

export default function NotReadyPage() {
  return (
    <PageLayout>
      <div
        className="flex justify-center items-center flex-col mt-16"
        style={{ gridArea: "main", color: "var(--primary-color)" }}
      >
        <span>This page is under construction</span>
        <span> ETA July 2022 </span>
      </div>
    </PageLayout>
  );
}
