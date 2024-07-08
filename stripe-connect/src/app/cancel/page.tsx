import Image from "next/image";
import React from "react";
import crossImg from "../../../public/img/cross.png";

const Cancel = () => {
    return (
        <div className="flex min-h-screen flex-col items-center p-24 text-4xl">
            <h2 className="mb-4">Order Canceled</h2>
            <Image src={crossImg} alt="check-logo" width={200} height={200} />
        </div>
    );
};

export default Cancel;