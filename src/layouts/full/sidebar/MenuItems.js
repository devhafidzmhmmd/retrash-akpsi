import {
    IconAdjustmentsHorizontal,
    IconClipboardData,
    IconLayoutDashboard,
    IconReportMoney,
    IconUserSquareRounded,
    IconTrash,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
    {
        id: uniqueId(),
        title: "Dashboard",
        icon: IconLayoutDashboard,
        href: "/dashboard",
        type: ["FIELD_OFFICER", "ADMINISTRATOR"],
    },
    {
        id: uniqueId(),
        title: "Data Warga",
        icon: IconUserSquareRounded,
        href: "/resident",
        type: ["ADMINISTRATOR"],
    },
    {
        id: uniqueId(),
        title: "Info Tagihan",
        icon: IconReportMoney,
        href: "/bill",
        type: ["FIELD_OFFICER", "ADMINISTRATOR"],
    },
    {
        id: uniqueId(),
        title: "Laporan Pembayaran",
        icon: IconClipboardData,
        href: "/payment",
        type: ["ADMINISTRATOR"],
    },
    {
        id: uniqueId(),
        title: "Laporan Kebersihan",
        icon: IconTrash,
        href: "/report",
        type: ["FIELD_OFFICER", "ADMINISTRATOR"],
    },
    {
        id: uniqueId(),
        title: "Kelola Pengguna",
        icon: IconAdjustmentsHorizontal,
        href: "/user",
        type: ["ADMINISTRATOR"],
    },
];

export default Menuitems;
