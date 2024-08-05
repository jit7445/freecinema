import NavbarItem from './NavbarItem';

export default function Navbar() {
  return (
    <div className=" hidden lg:block">
      <div className="flex  snap-x w-full  dark:bg-gray-600 bg-amber-100 p-4  justify-center lg:gap-3 md:gap-4 sm:gap-1 overflow-x-auto h">
        <NavbarItem title="Trending" param="trending" className="scroll-mr-0.5 snap-start" />
        <NavbarItem title="Popular" param="popular" className="scroll-mr-0.5 snap-start" />
        <NavbarItem title="TV Shows" param="tvShows" className="scroll-mr-0.5 snap-start" />
        <NavbarItem title="Top Rated" param="topRated" className="scroll-mr-0.5 snap-start" />
        <NavbarItem title="Upcoming movies" param="upcoming" className="scroll-mr-0.5 snap-start" />
      </div>
    </div>
  );
}