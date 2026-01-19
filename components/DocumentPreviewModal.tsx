"use client";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

const DocumentPreviewModal = ({
    showModal,
    setShowModal,
    document,
}: {
    showModal: boolean;
    setShowModal: (showModal: boolean) => void;
    document: any;
}) => {
    return (
        <Dialog open={showModal} onOpenChange={setShowModal}>
            <DialogContent className="max-w-5xl p-0 gap-0 overflow-hidden bg-white rounded-xl shadow-2xl border-0">

                {/* Header */}
                <DialogHeader className="bg-gradient-to-r from-blue-600 to-cyan-500 p-5">
                    <DialogTitle className="text-white text-lg font-medium">
                        Document Preview
                    </DialogTitle>
                </DialogHeader>

                {/* Body */}
                <div className="h-[70vh] w-full bg-gray-100">
                    <iframe
                        src={document?.data}
                        className="w-full h-full"
                        title="PDF Preview"
                    />
                </div>

                {/* Footer */}
                <div className="p-5 border-t border-gray-100 flex justify-end">
                    <button
                        className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-6 py-2 rounded-lg text-sm"
                        onClick={() => setShowModal(false)}
                    >
                        Close
                    </button>
                </div>

            </DialogContent>
        </Dialog>
    );
};

export default DocumentPreviewModal;
