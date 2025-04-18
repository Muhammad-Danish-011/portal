import NumberFormat from "@/utils/NumberFormat";
import { Link, Navigation } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FcCustomerSupport } from "react-icons/fc";
import TopCountryTimeBar from "../functional/TopCountryTimeBar";
import Logo from "./logo";

interface HeaderProps {
    user: any;
    stockCount: number;
    isUpdate: boolean;
    checkUser: () => void;
    locations: any[];
}

const Header = ({ user, stockCount, isUpdate, checkUser, locations }: HeaderProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const openMobileSearchModal = () => setIsOpen(true);

    return (
        <>
    {/* Mobile Stock Count */}
    <div className="flex justify-center headerbg text-center container-fluid font-semibold text-[#221C63] bg-[#fab619] py-2 text-sm md:text-base">
        Total Stock:
        <span className="pl-3">
            <NumberFormat numbers={stockCount} />
        </span>
    </div>

    {/* Header */}
    <header className="flex headerbg bg-[#fab619] items-center justify-between p-2 md:p-4">         
        <div className="flex flex-col md:flex-row items-center justify-center w-full gap-2 md:gap-4">
            <TopCountryTimeBar stockCount={stockCount} />
            {/* Support Section */}
            <div className="flex items-center justify-end">
                <FcCustomerSupport className="m-1 md:m-2 md:text-[40px] text-[28px]" />
                <div className="currencydropdown">
                    <button className="currencydropbtn supportbtn text-xs md:text-base">
                        Support
                        <br />
                        <span className="text-[10px] md:text-sm">+49 471 9731 9003</span>
                    </button>
                </div>
            </div>
        </div>
    </header>
</>
)
};
export default Header;
