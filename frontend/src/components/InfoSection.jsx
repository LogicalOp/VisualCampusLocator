import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Upload Your Image",
    description: "Start by uploading a photo of any location to find where it is in the world.",
    icon: "📸",
  },
  {
    title: "Location Detection",
    description: "The image is analyzed and a match is identified.",
    icon: "🧠",
  },
  {
    title: "Side-by-Side Comparison",
    description: "View your uploaded image next to the AI’s detected location for easy verification.",
    icon: "🔍",
  },
  {
    title: "View on Map",
    description: "Click on the result to open the location on a map.",
    icon: "🗺️",
  },
]

export default function InfoSection() {
  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="bg-gray-900 text-white">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <span className="text-4xl mr-2">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
