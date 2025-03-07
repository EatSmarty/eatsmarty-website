import ProductPageClient from "./ProductPage";

export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default function ProductPage({ params }: { params: { id: string } }) {
  return <ProductPageClient params={params} />;
}
