const getProductsData = (
  electronicsId: string,
  jewelryId: string,
  menClothingId: string,
  womenClothingId: string,
) => [
  {
    price: 109.95,
    image: '/products/81fPKd-2AYL._AC_SL1500_.jpg',
    category: { connect: { id: menClothingId } },
    rating: {
      create: {
        rate: 3.9,
        count: 120,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
            description:
              'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
          },
          {
            lang: 'bg',
            title: 'Fjallraven - раница Foldsack № 1, подходяща за 15 лаптопа',
            description:
              'Вашият перфектен пакет за ежедневна употреба и разходки в гората. Скрийте вашия лаптоп (до 15 инча) в подплатения калъф, вашето ежедневие',
          },
          {
            lang: 'es',
            title:
              'Fjallraven - Mochila Foldsack No. 1 apta para 15 portátiles',
            description:
              'Tu mochila perfecta para el día a día y los paseos por el bosque. Oculta tu portátil (hasta 15 pulgadas) en el estuche acolchado, tu día a día',
          },
        ],
      },
    },
  },
  {
    price: 22.3,
    image: '/products/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: { connect: { id: menClothingId } },
    rating: {
      create: {
        rate: 4.1,
        count: 259,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Mens Casual Premium Slim Fit T-Shirt',
            description:
              'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
          },
          {
            lang: 'bg',
            title: 'Мъжка ежедневна тениска Premium Slim Fit',
            description:
              'Прилепнал стил, контрастен реглан дълъг ръкав, панделка с три копчета, лека и мека материя за дишащо и удобно носене. И плътни шевни ризи с обло деколте, направени за издръжливост и страхотно прилягане за ежедневно модно облекло и заклети фенове на бейзбола. Облото деколте в стил Хенли включва ремък с три копчета.',
          },
          {
            lang: 'es',
            title: 'Camiseta casual premium slim fit para hombre',
            description:
              'Estilo ajustado, manga larga raglán en contraste, tapeta de tres botones, tejido ligero y suave para un uso transpirable y cómodo. Y camisas de cuello redondo con costuras sólidas hechas para una mayor durabilidad y un gran calce para la moda informal y los fanáticos acérrimos de béisbol El escote redondo estilo Henley presenta una correa de tres botones ',
          },
        ],
      },
    },
  },
  {
    price: 22.3,
    image: '/products/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg',
    category: { connect: { id: menClothingId } },
    rating: {
      create: {
        rate: 4.1,
        count: 259,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Mens Casual Premium Slim Fit T-Shirt',
            description:
              'Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.',
          },
          {
            lang: 'bg',
            title: 'Мъжка ежедневна тениска Premium Slim Fit',
            description:
              'Прилепнал стил, контрастен реглан дълъг ръкав, панделка с три копчета, лека и мека материя за дишащо и удобно носене. И плътни шевни ризи с обло деколте, направени за издръжливост и страхотно прилягане за ежедневно модно облекло и заклети фенове на бейзбола. Облото деколте в стил Хенли включва ремък с три копчета.',
          },
          {
            lang: 'es',
            title: 'Camiseta casual premium slim fit para hombre',
            description:
              'Estilo ajustado, manga larga raglán en contraste, tapeta de tres botones, tejido ligero y suave para un uso transpirable y cómodo. Y camisas de cuello redondo con costuras sólidas hechas para una mayor durabilidad y un gran calce para la moda informal y los fanáticos acérrimos de béisbol El escote redondo estilo Henley presenta una correa de tres botones ',
          },
        ],
      },
    },
  },
  {
    price: 55.99,
    image: '/products/71li-ujtlUL._AC_UX679_.jpg',
    category: { connect: { id: menClothingId } },
    rating: {
      create: {
        rate: 4.7,
        count: 500,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Mens Cotton Jacket',
            description:
              'great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.',
          },
          {
            lang: 'bg',
            title: 'Мъжко памучно яке',
            description:
              'страхотни горни якета за пролет/есен/зима, подходящи за много поводи, като работа, туризъм, къмпинг, планинско/скално катерене, колоездене, пътуване или други дейности на открито. Добър избор за подарък за вас или член на вашето семейство. Сърдечна любов към баща, съпруг или син в този ден на благодарност или Коледа.',
          },
          {
            lang: 'es',
            title: 'Chaqueta de algodón para hombre',
            description:
              'excelentes chaquetas de abrigo de primavera/otoño/invierno, adecuadas para muchas ocasiones, como el trabajo, el senderismo, el campamento, la montaña/escalada, el ciclismo, los viajes u otras actividades al aire libre. Una buena opción de regalo para usted o un miembro de tu familia. Amor sincero a un padre, esposo o hijo en este Día de Acción de Gracias o Navidad',
          },
        ],
      },
    },
  },
  {
    price: 15.99,
    image: '/products/71YXzeOuslL._AC_UY879_.jpg',
    category: { connect: { id: menClothingId } },
    rating: {
      create: {
        rate: 2.1,
        count: 430,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Mens Casual Slim Fit',
            description:
              'The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product.',
          },
          {
            lang: 'bg',
            title: 'Мъжки ежедневни Slim Fit',
            description:
              'Цветът може да е малко по-различен на екрана и на практика. / Моля, имайте предвид, че телесните конструкции варират според хората, следователно подробната информация за размера трябва да бъде прегледана по-долу в описанието на продукта.',
          },
          {
            lang: 'es',
            title: 'Moda informal ajustada para hombre',
            description:
              'El color puede ser ligeramente diferente en la pantalla y en la práctica. / Tenga en cuenta que las estructuras del cuerpo varían según las personas, por lo tanto, la información detallada sobre el tamaño debe revisarse a continuación en la descriptio del producto',
          },
        ],
      },
    },
  },
  {
    price: 695,
    image: '/products/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg',
    category: { connect: { id: jewelryId } },
    rating: {
      create: {
        rate: 4.6,
        count: 400,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
            description:
              "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
          },
          {
            lang: 'bg',
            title:
              'Гривна с верига John Hardy Legends Naga Gold & Silver Dragon Station',
            description:
              'От нашата колекция Legends, Naga е вдъхновен от митичния воден дракон, който защитава перлата на океана. Носете с лице навътре, за да бъдете дарени с любов и изобилие, или навън за защита.',
          },
          {
            lang: 'es',
            title:
              'Pulsera de cadena con estación de dragón dorada y plateada Naga de John Hardy Legends',
            description:
              'De nuestra colección Legends, el Naga está inspirado en el mítico dragón de agua que protege la perla del océano. Úselo mirando hacia adentro para recibir una lluvia de amor y abundancia, o hacia afuera para protegerse',
          },
        ],
      },
    },
  },
  {
    price: 152,
    image: '/products/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg',
    category: { connect: { id: jewelryId } },
    rating: {
      create: {
        rate: 3.9,
        count: 70,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Solid Gold Petite Micropave',
            description:
              'Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.',
          },
          {
            lang: 'bg',
            title: 'Масивно злато Petite Micropave',
            description:
              'Гарантирано удовлетворение. Върнете или заменете всяка поръчка в рамките на 30 дни. Проектирано и продадено от Hafeez Center в Съединените щати. Гарантирано удовлетворение. Върнете или заменете всяка поръчка в рамките на 30 дни.',
          },
          {
            lang: 'es',
            title: 'Petite Micropave Solid Gold',
            description:
              'Satisfacción garantizada. Devuelva o cambie cualquier pedido dentro de los 30 días. Diseñado y vendido por Hafeez Center en los Estados Unidos. Satisfacción garantizada. Devuelva o cambie cualquier pedido dentro de los 30 días.',
          },
        ],
      },
    },
  },
  {
    price: 9.99,
    image: '/products/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg',
    category: { connect: { id: jewelryId } },
    rating: {
      create: {
        rate: 3,
        count: 400,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'White Gold Plated Princess',
            description:
              "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
          },
          {
            lang: 'bg',
            title: 'Принцеса с бяло позлатено покритие',
            description:
              'Класически създаден сватбен годежен пасианс Диамантен пръстен с обещание за нея. Подаръци, които да развалят повече любовта ви за годеж, сватба, годишнина, Свети Валентин...',
          },
          {
            lang: 'es',
            title: 'Princesa dorada blanca',
            description:
              'Solitario de compromiso de boda de diseño clásico. Anillo de promesa de diamante para ella. Regalos para mimar más tu amor por compromiso, boda, aniversario, San Valentín...',
          },
        ],
      },
    },
  },
  {
    price: 91.99,
    image: '/products/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg',
    category: { connect: { id: jewelryId } },
    rating: {
      create: {
        rate: 1.9,
        count: 100,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Pierced Owl Rose Gold Plated Stainless Steel Double',
            description:
              'Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel',
          },
          {
            lang: 'bg',
            title:
              'Прободен бухал Двойна неръждаема стомана с покритие от розово злато',
            description:
              'Двойни обеци с тунелни тапи с покритие от розово злато. Изработени от неръждаема стомана 316L',
          },
          {
            lang: 'es',
            title: 'Búho perforado doble acero inoxidable chapado en oro rosa',
            description:
              'Pendientes de doble túnel chapados en oro rosa. Fabricados en acero inoxidable 316L',
          },
        ],
      },
    },
  },
  {
    price: 65,
    image: '/products/61IBBVJvSDL._AC_SY879_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 3.3,
        count: 203,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'WD 2TB Elements Portable External Hard Drive - USB 3.0 ',
            description:
              'USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system',
          },
          {
            lang: 'bg',
            title: 'Преносим външен твърд диск WD 2TB Elements - USB 3.0',
            description:
              'USB 3.0 и USB 2.0 Съвместимост Бързи трансфери на данни Подобряване на производителността на компютъра Висок капацитет; Съвместимост Форматиран NTFS за Windows 10, Windows 8.1, Windows 7; Може да се наложи преформатиране за други операционни системи; Съвместимостта може да варира в зависимост от хардуерната конфигурация на потребителя и операционна система',
          },
          {
            lang: 'es',
            title: 'Disco duro externo portátil WD Elements de 2 TB - USB 3.0',
            description:
              'Compatibilidad con USB 3.0 y USB 2.0 Transferencias de datos rápidas Mejora el rendimiento de la PC Alta capacidad; Compatibilidad NTFS formateado para Windows 10, Windows 8.1, Windows 7; Es posible que sea necesario volver a formatear para otros sistemas operativos; La compatibilidad puede variar según el hardware del usuario configuración y sistema operativo',
          },
        ],
      },
    },
  },
  {
    price: 109,
    image: '/products/61U7T1koQqL._AC_SX679_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 2.9,
        count: 470,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
            description:
              'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
          },
          {
            lang: 'bg',
            title: 'SanDisk SSD PLUS 1TB Вътрешен SSD - SATA III 6 Gb/s',
            description:
              'Лесна надстройка за по-бързо зареждане, изключване, зареждане на приложения и реакция (В сравнение с 5400 RPM SATA 2.5” твърд диск; Въз основа на публикувани спецификации и вътрешни сравнителни тестове, използващи PCMark vantage резултати) Увеличава производителността на пакетен запис, което го прави идеален за типични работни натоварвания на компютри Перфектен баланс между производителност и надеждност Скорости на четене/запис до 535MB/s/450MB/s (Въз основа на вътрешни тестове; производителността може да варира в зависимост от капацитета на устройството, хост устройството, операционната система и приложението.)',
          },
          {
            lang: 'es',
            title: 'SanDisk SSD PLUS 1TB SSD interno - SATA III 6 Gb/s',
            description:
              'Fácil actualización para un arranque, apagado, carga de aplicaciones y capacidad de respuesta más rápidos (en comparación con un disco duro SATA de 2,5" a 5400 RPM; basado en especificaciones publicadas y puntos de referencia internos que utilizan puntajes PCMark vantage) Aumenta el rendimiento de la escritura por lotes, por lo que es ideal para cargas de trabajo típicas de PC Equilibrio perfecto entre rendimiento y confiabilidad Velocidades de lectura/escritura de hasta 535 MB/s/450 MB/s (según pruebas internas; el rendimiento puede variar según la capacidad de la unidad, el dispositivo host, el sistema operativo y la aplicación. )',
          },
        ],
      },
    },
  },
  {
    price: 120,
    image: '/products/71kWymZ+c+L._AC_SX679_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 4.8,
        count: 319,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
            description:
              '3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.',
          },
          {
            lang: 'bg',
            title:
              'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
            description:
              '3D NAND флаш се прилага за осигуряване на високи скорости на трансфер Забележителни скорости на трансфер, които позволяват по-бързо стартиране и подобрена цялостна производителност на системата. Усъвършенстваната SLC Cache технология позволява повишаване на производителността и по-дълъг живот. 7 мм тънък дизайн, подходящ за ултрабуци и ултратънки преносими компютри . Поддържа команда TRIM, технология за събиране на отпадъци, RAID и ECC (проверка и корекция на грешки), за да осигури оптимизирана производителност и подобрена надеждност.',
          },
          {
            lang: 'es',
            title:
              'Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5',
            description:
              'Se aplica flash 3D NAND para proporcionar altas velocidades de transferencia. Velocidades de transferencia notables que permiten un inicio más rápido y un rendimiento general mejorado del sistema. La tecnología SLC Cache avanzada permite un mayor rendimiento y una vida útil más larga. Diseño delgado de 7 mm adecuado para ultrabooks y ultradelgados portátiles Admite el comando TRIM, la tecnología de recolección de basura, RAID y ECC (verificación y corrección de errores) para garantizar un rendimiento optimizado y una confiabilidad mejorada',
          },
        ],
      },
    },
  },
  {
    price: 115,
    image: '/products/61mtL65D4cL._AC_SX679_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 4.8,
        count: 400,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              'WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive',
            description:
              "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
          },
          {
            lang: 'bg',
            title:
              'WD 4TB устройство за игри работи с преносим външен твърд диск Playstation 4',
            description:
              'Разширете вашето PS4 игрово изживяване, Играйте навсякъде Бързо и лесно, настройка Елегантен дизайн с голям капацитет, 3-годишна ограничена гаранция от производителя',
          },
          {
            lang: 'es',
            title:
              'La unidad para juegos WD de 4 TB funciona con el disco duro externo portátil Playstation 4',
            description:
              'Amplía tu experiencia de juego de PS4, juega en cualquier lugar de forma rápida y sencilla, configura diseño elegante con gran capacidad, garantía limitada del fabricante de 3 años',
          },
        ],
      },
    },
  },
  {
    price: 559,
    image: '/products/81QpkIctqPL._AC_SX679_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 2.9,
        count: 250,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
            description:
              '21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz',
          },
          {
            lang: 'bg',
            title:
              'Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin',
            description:
              '21.5 инча Full HD (1920 x 1080) широкоекранен IPS дисплей и Radeon free Sync технология. Няма съвместимост за VESA Mount Refresh Rate: 75Hz - Използване на HDMI порт Zero-frame дизайн | ултратънък | 4ms време за реакция | IPS панел Съотношение на страните - 16: 9. Поддържан цвят - 16. 7 милиона цвята. Яркост - 250 nit Ъгъл на наклон -5 градуса до 15 градуса. Хоризонтален зрителен ъгъл - 178 градуса. Вертикален зрителен ъгъл - 178 градуса 75 херца',
          },
          {
            lang: 'es',
            title:
              'Acer SB220Q bi 21,5 pulgadas Full HD (1920 x 1080) IPS ultrafino',
            description:
              'Pantalla IPS de pantalla ancha Full HD (1920 x 1080) de 21,5 pulgadas y tecnología Radeon free Sync. Sin compatibilidad con montaje VESA Frecuencia de actualización: 75 Hz - Con puerto HDMI Diseño de marco cero | ultradelgado | Tiempo de respuesta de 4 ms | IPS Relación de aspecto del panel: 16: 9. Color admitido: 16. 7 millones de colores. Brillo: 250 nit Ángulo de inclinación: de 5 a 15 grados Ángulo de visión horizontal: 178 grados Ángulo de visión vertical: 178 grados 75 hercios',
          },
        ],
      },
    },
  },
  {
    price: 999.99,
    image: '/products/81Zt42ioCgL._AC_SX679_.jpg',
    category: { connect: { id: electronicsId } },
    rating: {
      create: {
        rate: 2.2,
        count: 140,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              'Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED',
            description:
              '49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag',
          },
          {
            lang: 'bg',
            title:
              'Samsung 49-инчов CHG90 144Hz извит монитор за игри (LC49HG90DMNXZA) – супер ултраширок екран QLED',
            description:
              '49 ИНЧОВ СУПЕР УЛТРАШИРОК 32:9 ИЗВИТ МОНИТОР ЗА ИГРИ с двоен 27 инчов екран един до друг QUANTUM DOT (QLED) ТЕХНОЛОГИЯ, поддръжка на HDR и фабрично калибриране осигурява удивително реалистичен и точен цвят и контраст 144 HZ ВИСОКА ЧЕСТОТА НА ОСНОВЯВАНЕ и 1 ms ултра бързото време за реакция работи за елиминиране на замъгляването при движение, призрачните изображения и намаляване на забавянето при въвеждане',
          },
          {
            lang: 'es',
            title:
              'Monitor curvo para juegos Samsung CHG90 de 49 pulgadas y 144 Hz (LC49HG90DMNXZA) - Super Ultrawide QLED',
            description:
              'MONITOR CURVO PARA JUEGOS 32:9 SUPER ULTRAWIDE DE 49 PULGADAS con TECNOLOGÍA QUANTUM DOT (QLED) doble de 27" lado a lado, compatibilidad con HDR y calibración de fábrica que ofrece colores y contraste increíblemente realistas y precisos BASE DE ALTA FRECUENCIA DE 144 HZ y El tiempo de respuesta ultrarrápido de 1 ms funciona para eliminar el desenfoque de movimiento, las imágenes fantasma y reducir el retraso de entrada',
          },
        ],
      },
    },
  },
  {
    price: 58.99,
    image: '/products/51Y5NI-I5jL._AC_UX679_.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 2.6,
        count: 235,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
            description:
              'Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates',
          },
          {
            lang: 'bg',
            title: 'BIYLACLESEN Дамско яке за сноуборд 3 в 1 Зимни палта',
            description:
              'Забележка: Якетата са със стандартен размер за САЩ. Моля, изберете размера като обичайното си облекло. Материал: 100% полиестер; Подвижна подплата: Топъл полар. Подвижна функционална подплата: Удобно за кожата, леко и топло. Яке с подплата със стойка яка, затоплят ви в студено време.Джобове с цип: 2 джоба за ръце с цип, 2 джоба с цип на гърдите (достатъчни за съхраняване на карти или ключове) и 1 скрит вътрешен джоб.Джобове за ръце с цип и скрит джоб пазят нещата ви сигурни.Хуманизиран дизайн: регулируем и Сваляща се качулка и регулируем маншет, за да предотвратят вятъра и водата, за удобно прилягане. Подвижният дизайн 3 в 1 осигурява повече удобство, можете да отделите палтото и вътрешната част, ако е необходимо, или да ги носите заедно. Подходящо е за различни сезони и ви помага адаптиране към различни климатични условия',
          },
          {
            lang: 'es',
            title:
              'BIYLACLESEN Chaqueta de snowboard para mujer 3 en 1 abrigos de invierno',
            description:
              'Nota: Las chaquetas son de talla estándar de EE. UU. Elija la talla como su ropa habitual. Material: 100 % poliéster; Forro extraíble: Polar cálido. Forro funcional extraíble: agradable al tacto, ligero y cálido. Chaqueta con forro con cuello alto, lo mantiene caliente en climas fríos. Bolsillos con cremallera: 2 bolsillos con cremallera para las manos, 2 bolsillos con cremallera en el pecho (suficientes para guardar tarjetas o llaves) y 1 bolsillo interior oculto. Bolsillo con cremallera y bolsillos ocultos para las manos para mantener sus cosas seguras. Diseño humanizado: Capucha ajustable y desmontable y puños ajustables para evitar el viento y el agua para un ajuste cómodo.El diseño extraíble 3 en 1 brinda más comodidad, puede separar el abrigo y la parte interior si es necesario, o usarlos juntos.Es adecuado para diferentes estaciones y lo ayuda adaptarse a diferentes climas',
          },
        ],
      },
    },
  },
  {
    price: 29.99,
    image: '/products/81XH0e8fefL._AC_UY879_.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 2.9,
        count: 340,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title:
              "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
            description:
              '100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON',
          },
          {
            lang: 'bg',
            title:
              'Lock and Love Дамско моторно яке с подвижна качулка от изкуствена кожа',
            description:
              '100% ПОЛИУРЕТАН (черупка) 100% ПОЛИЕСТЕР (подплата) 75% ПОЛИЕСТЕР 25% ПАМУК (ПУЛОВЕР), материал от изкуствена кожа за стил и комфорт / 2 джоба отпред, изкуствена кожа в деним стил с качулка 2 за един сако, детайл с копчета на талията / детайлни шевове отстрани, САМО РЪЧНО ПРАНЕ / НЕ ИЗБЕЛВАНЕ / СУШЕНЕ НА ЛИНИЯ / НЕ ГЛАДЕНЕ',
          },
          {
            lang: 'es',
            title:
              'Chaqueta motera Lock and Love para mujer con capucha de piel sintética desmontable',
            description:
              '100 % POLIURETANO (cubierta) 100 % POLIÉSTER (forro) 75 % POLIÉSTER 25 % ALGODÓN (JERSEY), material de piel sintética para estilo y comodidad / 2 bolsillos delanteros, piel sintética estilo denim con capucha 2 para un botón de la chaqueta detalle de cintura / detalle de costura lateral SÓLO LAVAR A MANO / NO USAR LEJÍA / SECAR EN LÍNEA / NO PLANCHAR',
          },
        ],
      },
    },
  },
  {
    price: 39.99,
    image: '/products/71HblAHs5xL._AC_UY879_-2.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 3.8,
        count: 679,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'Rain Jacket Women Windbreaker Striped Climbing Raincoats',
            description:
              "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
          },
          {
            lang: 'bg',
            title:
              'Дъждовно яке Дамска ветровка Раирани дъждобрани за катерене',
            description:
              'Лек перфектен за пътуване или ежедневно облекло---Дълги ръкави с качулка, регулируем дизайн на талията. Дъждобран с копчета и цип отпред, изцяло подплатен и Дъждобрана има 2 странични джоба и е добър размер за съхранение на всякакви видове от нещата покрива бедрата, а качулката е щедра, но не прекалява. Прикрепената качулка с памучна подплата и регулируеми шнурове й придава истински стилен вид.',
          },
          {
            lang: 'es',
            title:
              'Chaqueta de lluvia impermeables de escalada a rayas cortavientos para mujer',
            description:
              'Liviana, perfecta para viajar o usar ropa casual---Mangas largas con capucha, diseño de cintura ajustable. Chubasquero con botones y cremallera al frente, totalmente forrado y tiene 2 bolsillos laterales y es de buen tamaño para guardar todo tipo de artículos cubre las caderas y la capucha es generosa pero no exagerada. La capucha adjunta con forro de algodón y cordones ajustables le da un aspecto realmente elegante',
          },
        ],
      },
    },
  },
  {
    price: 9.99,
    image: '/products/71z3kpMAYsL._AC_UY879_.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 4.7,
        count: 130,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: "MBJ Women's Solid Short Sleeve Boat Neck V",
            description:
              '95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem',
          },
          {
            lang: 'bg',
            title: 'MBJ Дамска плътна лодка с къс ръкав V',
            description:
              '95% РАЙОН 5% СПАНДЕКС, Произведено в САЩ или внесено, Не се избелва, Лека материя с голямо разтягане за комфорт, Оребрени ръкави и деколте / Двойни шевове на долния подгъв',
          },
          {
            lang: 'es',
            title: 'Camiseta sin mangas en V de manga corta para mujer MBJ',
            description:
              '95 % RAYÓN, 5 % SPANDEX, Hecho en EE. UU. o importado, Sin blanqueamiento, Tejido liviano con alto estiramiento para mayor comodidad, Mangas y escote acanalados / Doble costura en el dobladillo inferior',
          },
        ],
      },
    },
  },
  {
    price: 7.99,
    image: '/products/51eg55uWmdL._AC_UX679_.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 4.5,
        count: 146,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: "Opna Women's Short Sleeve Moisture",
            description:
              '100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort',
          },
          {
            lang: 'bg',
            title: 'Opna Дамски влага с къс ръкав',
            description:
              '100% полиестер, машинно пране, 100% катионен полиестер за блокиране, машинно пране и предварително свиване за страхотно прилягане, лек, просторен и много дишащ с влагоотвеждащ плат, който помага да се предпази влагата, мека лека материя с удобни Яката с V-образно деколте и по-тънката кройка осигуряват елегантен, по-женствен силует и допълнителен комфорт',
          },
          {
            lang: 'es',
            title: 'Traje de neopreno de manga corta para mujer Opna',
            description:
              '100 % poliéster, lavable a máquina, bloque de 100 % poliéster catiónico, lavable a máquina y preencogido para un gran calce, ligero, espacioso y muy transpirable con tela que absorbe la humedad para ayudar a mantener la humedad alejada, tela suave y liviana con cómodo El cuello en V y el ajuste más ceñido brindan una silueta elegante y más femenina y mayor comodidad.',
          },
        ],
      },
    },
  },
  {
    price: 17.99,
    image: '/products/61pHAEJ4NML._AC_UX679_.jpg',
    category: { connect: { id: womenClothingId } },
    rating: {
      create: {
        rate: 3.6,
        count: 145,
      },
    },
    translations: {
      createMany: {
        data: [
          {
            lang: 'en',
            title: 'DANVOUY Womens T Shirt Casual Cotton Short',
            description:
              '95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.',
          },
          {
            lang: 'bg',
            title: 'Дамска тениска DANVOUY Ежедневна памучна къса',
            description:
              '95% памук, 5% спандекс, характеристики: ежедневни, къс ръкав, щампа с букви, V-образно деколте, модни тениски, материята е мека и има известна еластичност., повод: ежедневни/офис/плаж/училище/ Начало/Улица. Сезон: Пролет, Лято, Есен, Зима.',
          },
          {
            lang: 'es',
            title: 'Camiseta corta casual de algodón para mujer DANVOUY',
            description:
              '95% algodón, 5% spandex, características: casual, manga corta, estampado de letras, cuello en V, camisetas de moda, la tela es suave y tiene algo de elasticidad, ocasión: casual/oficina/playa/ escuela / Hogar/Calle. Temporada: Primavera, Verano, Otoño, Invierno',
          },
        ],
      },
    },
  },
];

export default getProductsData;
