import Image from "next/image";

const profile = ({params}) => {
  return (
    <div className="flex p-[16%] lg:mx-[24%] m-4">
      <div className="lg:p-2 p-12 ">
        <div className="flex w-max items-end gap-4">
       <h1>{params.id}</h1>
        </div>
        <div>
          <h2 className="text-2xl font-bold">John Doe</h2>
          <p className="text-gray-600">john.doe@example.com</p>
        </div>
      </div>
    </div>
  );
};

export default profile;
