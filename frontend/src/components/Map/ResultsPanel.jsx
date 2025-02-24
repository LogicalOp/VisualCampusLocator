import { Card, CardContent } from "@/components/ui/card";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// eslint-disable-next-line react/prop-types
export default function ResultsPanel({ isVisible, onClose, uploadedImage, locationName, imageResult }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 right-0 h-full w-full md:w-96 bg-black/80 backdrop-blur-lg shadow-lg text-white flex flex-col p-4"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-400"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Title */}
          <h2 className="text-lg font-semibold text-center mb-4">Image Match</h2>

          {/* Result & Your Image Cards */}
          <div className="flex flex-col gap-4">
            {/* Result Card */}
            <Card className="bg-gray-900 rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={imageResult}
                  alt="Result"
                  className="w-full h-40 object-contain rounded-lg"
                />
                <div className="mt-3 text-center">
                  <p className="text-lg font-semibold">Result</p>
                  <p className="text-sm text-gray-400">
                    The detected location based on your image.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Your Image Card */}
            <Card className="bg-gray-900 rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center">
                <img
                  src={uploadedImage}
                  alt="Your Image"
                  className="w-full h-40 object-contain rounded-lg"
                />
                <div className="mt-3 text-center">
                  <p className="text-lg font-semibold">Your Image</p>
                  <p className="text-sm text-gray-400">
                    The image you uploaded for search.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Location Name Card */}
            <Card className="bg-gray-900 rounded-lg overflow-hidden">
              <CardContent className="p-4 flex flex-col items-center">
                <div className="mt-3 text-center">
                  <p className="text-lg font-semibold">{locationName}</p>
                  <p className="text-sm text-gray-400">
                    The name of the detected location.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

        </motion.div>
      )}
    </AnimatePresence>
  );
}