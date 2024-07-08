import React from "react";
import Image from "next/image";
import checkImg from "../../../public/img/check.png";

const Success = () => {
    return (
        <div className="flex min-h-screen flex-col items-center p-24 text-4xl">
            <h2 className="mb-4">Order Completed</h2>
            <Image src={checkImg} alt="check-logo" width={200} height={200} />
        </div>
    );
};

export default Success;