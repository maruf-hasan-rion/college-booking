import CollegeSearch from "@/components/CollegeSearch";
import ImageGallery from "@/components/ImageGallery";
import ResearchPapersSection from "@/components/ResearchPapersSection";
import Reviews from "@/components/Reviews";

export default function Home() {
  return (
    <div>
      <CollegeSearch></CollegeSearch>
      <ImageGallery></ImageGallery>
      <ResearchPapersSection></ResearchPapersSection>
      <Reviews></Reviews>
    </div>
  );
}
