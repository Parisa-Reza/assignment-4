export default function CartLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <section className="bg-gray-50 dark:bg-black">{children}</section>;
}
