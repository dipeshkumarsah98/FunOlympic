export default function Sports() {
  const sports = [
    {
      id: 1,
      name: 'Football',
      href: '#',
      time: 'Time: 6:00 (+5:45 GMT)',
      imageSrc: 'https://cdn.pixabay.com/photo/2022/03/08/15/44/boy-7056003_1280.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
    {
      id: 2,
      name: 'Nomad Tumbler',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg',
      imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
    },
    {
      id: 3,
      name: 'Focus Paper Refill',
      href: '#',
      time: '$89',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg',
      imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
    },
    {
      id: 4,
      name: 'Machined Mechanical Pencil',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

		{
      id: 5,
      name: 'Machined Mechanical Pencil',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

    {
      id: 6,
      name: 'Machined Mechanical Pencil',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

    {
      id: 7,
      name: 'Football',
      href: '#',
      time: 'Time: 6:00 (+5:45 GMT)',
      imageSrc: 'https://cdn.pixabay.com/photo/2022/03/08/15/44/boy-7056003_1280.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },

    {
      id: 8,
      name: 'Machined Mechanical Pencil',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

    {
      id: 9,
      name: 'Machined Mechanical Pencil',
      href: '#',
      time: '$35',
      imageSrc: 'https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg',
      imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
    },

    {
      id: 10,
      name: 'Football',
      href: '#',
      time: 'Time: 6:00 (+5:45 GMT)',
      imageSrc: 'https://cdn.pixabay.com/photo/2022/03/08/15/44/boy-7056003_1280.jpg',
      imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
    },
  ]

  return (
    <>
		  <div className="bg-white">
		    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h1 className="mb-10 text-lg">All Sports</h1>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
              {sports.map((sport) => (
                <a key={sport.id} href={`/sports/${sport.id}`} className="group">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
                    <img
                      src={sport.imageSrc}
                      alt={sport.imageAlt}
                      className="h-full w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <h3 className="mt-4 text-sm text-gray-700">{sport.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">{sport.time}</p>
                </a>
          ))}
          </div>
			  </div>
		  </div>
    </>
  );
}
