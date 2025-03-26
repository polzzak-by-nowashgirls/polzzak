import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/Carousel/Carousel';

function VisualCarousel() {
  return (
    <Carousel className="h-auto min-h-[15rem] w-full" opts={{ loop: true }}>
      <CarouselContent>
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem key={index}>
            <div className="h_full w-full">
              <img
                src={`images/visual_${index + 1}.png`}
                alt=""
                className="h-full w-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

export default VisualCarousel;
