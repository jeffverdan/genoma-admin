import HeadSeo from "@/components/HeadSeo/HeadSeo"
import { useState } from "react";
import MenuLateral from "./componentes/MenuLateral";
import Dashboard from "./componentes/Dashboard/Dashboard";

export default function Admin() {
    const [selectedIndex, setSelectedIndex] = useState(0);

    return (
        <>
            <HeadSeo title="Admin Page" description="This is the admin page." />
            <main className="admin-container">

                <MenuLateral selectedIndex={selectedIndex} handleChangeMenu={setSelectedIndex} />

                {selectedIndex === 0 && <Dashboard selectedIndex={selectedIndex} handleChangeMenu={setSelectedIndex} />}

            </main>
        </>
    );
}