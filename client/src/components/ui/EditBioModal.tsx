import { useState, useRef } from "react";
import Button from "./Button";

function EditBioModal({
    onClose,
    userBio,
    setBio,
}: {
    onClose: () => void;
    userBio?: string;
    setBio: (bio: string) => void;
}) {
    const [bioEdit, setBioEdit] = useState(userBio);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const value = e.target.value;
        setBioEdit(value);
    };

    const handleSave = async () => {
        if (bioEdit && bioEdit !== userBio) {
            await setBio(bioEdit);
            onClose();
        } else if (bioEdit === userBio) {
            alert("Bio has not been updated, edit the bio and save.");
        }
    };

    return (
        <div className="w-100 h-fit max-sm:w-9/10 bg-[#1a1b2e] border border-purple-500/30 text-gray-200 rounded-2xl shadow-2xl py-8 px-6 flex flex-col relative">
            <i
                onClick={onClose}
                className="fa fa-close text-xl text-gray-400 hover:text-gray-50 absolute top-4 right-4 cursor-pointer transition"
            ></i>
            <h2 className="text-3xl max-sm:text-2xl font-bold gradient text-center">
                <i className="fa fa-star"></i> Your Bio
            </h2>
            <p className="text-sm text-gray-400 mt-3 text-center">
                Tell us a little about yourself.
            </p>

            <textarea
                placeholder="🖊️ Write about your self..."
                maxLength={150}
                name="userBio"
                id="userBio"
                className="bg-purple-200/10 my-4 outline-0 ring-0 rounded-2xl p-4 text-sm h-25"
                defaultValue={userBio || ""}
                onChange={handleInputChange}
                ref={textareaRef}
            />
            <Button onClick={handleSave} text="Save Bio" />
        </div>
    );
}

export default EditBioModal;
