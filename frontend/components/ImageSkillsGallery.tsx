import Image from "next/image";

function ImageSkillsGallery() {
  return (
    <div className="flex flex-wrap gap-5 lg:gap-10">
      {Array.from({ length: 6 }, (_, i) => (
        <Image
          key={i}
          className="rounded-xl object-cover aspect-square w-full sm:w-40"
          src={`/assets/images/skill${i + 1}.jpeg`}
          alt="skill"
          width={500}
          height={500}
        />
      ))}
    </div>
  );
}

export default ImageSkillsGallery;
