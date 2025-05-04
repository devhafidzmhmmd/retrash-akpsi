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
    },
    {
        id: uniqueId(),
        title: "Data Warga",
        icon: IconUserSquareRounded,
        href: "/resident",
    },
    {
        id: uniqueId(),
        title: "Info Tagihan",
        icon: IconReportMoney,
        href: "/bill",
    },
    {
        id: uniqueId(),
        title: "Laporan Pembayaran",
        icon: IconClipboardData,
        href: "/payment",
    },
    {
        id: uniqueId(),
        title: "Laporan Kebersihan",
        icon: IconTrash,
        href: "/report",
    },
    {
        id: uniqueId(),
        title: "Kelola Pengguna",
        icon: IconAdjustmentsHorizontal,
        href: "/user",
    },
];

export default Menuitems;
