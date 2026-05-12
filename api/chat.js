export default async function handler(req, res) {
  // 🔥 CORS (Mantener para permitir conexión desde GitHub)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });

  // 🏠 URL de tu Ngrok configurada en el panel de Vercel
  const URL_LOCAL = process.env.OLLAMA_BASE_URL;

  if (!URL_LOCAL) {
    return res.status(500).json({ error: "La URL del servidor local no está configurada en Vercel" });
  }

  const bodyData = req.body;
  let contentsValido = bodyData.historial || [];

  const instruccionesSistema = `Eres el Bibliotecario digital de la Biblioteca de Ibros, te llamas José. Trabajas con Antonio Jesús. 
  Recomienda libros y fomenta la lectura. Si preguntan por disponibilidad, que usen el buscador o pregunten a Antonio Jesús en el Punto Vuela. 
  Tu creador es José Romero Cortés. Responde SIEMPRE de forma muy muy corta menos de 15 palabras, no pases las 8 palabras normalmente pero si es para resumir libros puedes llegar hasta las 20 palabras. Si te preguntan por un libro recuerda que hay muchos libros en la biblioteca y no los conoces todos, que comprueben la disponibilidad en el buscador de la web o que pregunten en el Punto Vuela donde estará tu compañero Antonio Jesús pero responde a esto con frases cortas de 8 palabras.Se muy cortés y educado. Libros para recomendar:
estanteria 1
 El talento de Mr. Ripley
Patricia Highismith
241440
Adios Muñeca
Raymond Chandler
241441
El Tercer Hombre
Graham Greene
241442
El signo de los cuatro
Arthur Conan Doyle
241443
El misterio del cuarto amarillo
Gaston Leroux
241444
El martillo azul
Ross Macdonald
241445
Cosecha Roja
Dashiell Hammett
241446
El caso del Canario asesinado
S. S. Van Dine
241447
El caso de la Chica Vacilante
Erle Stanley Gardner
241448
El misterio de los Hermanos siameses
Ellery Queen
241449
El cartero siemre llama dos veces
James M. Cain
241450
Los Hermanos Rico
Georges Simenon
241451
Sangre en el espejo de la reina
Carter Dickson
241452
El candor del padre Brown
G.K. Chesterton
241453
No quisiera estar en tus zapatos
William Irish
241454
Extraños en un tren
Patricia Highismith
241455
Escupire sobre vuestra tumba
Boris Vian
241456
El asesinato de Roger Ackroyd
Agatha Christie
241457
La mascara de Dimitrios
Eric Ambler
241458
1280 almas
Jim Thompson
241459
Muerte en la Rectoria
Michael Innes
241460
Yo, el Jurado
Mickey Spillane
241461
El caso del Gatito Imprudente
Erle Stanley Gardner
241462
¿Acaso no Matan los Caballos?
Horace Mccoy
241463
La gente Terrible
Edgar Wallace
241464
Una corona para tu entierro
James Hadley Chase
241465
La bestia debe morir
Nicholas Blake
241466
El ultimo caso de Drury Lane
Ellery Queen
241467
La dama de Blanco I
Wilkie Collins
241468
La dama de Blanco II
Wilkie Collins
241469
El caso Saint-Fiacre
Georges Simeon
241470
Pacto de Sangre
James M. Cain
241471
Arsenio Lupin, caballero ladron
Maurice Leblanc
241472
El hombre que no era nadie
Edgar Wallace
241473
Las aventuras del Sherlock holmes
Arthur Conan Doyle
241474
¡Hamlet, venganza!
Michael Innes
241475
La llave de Cristal
Dashiell Hammett
241476
El sueño eterno
Raymond Chandler
241477
El cadaver fugitivo
Ellery Queen
241478
El grito de la lechuza
Patricia Highismith
241479
Un hombre en la oscuridad
Paul Auster
241480
Las piedras son testigo
Jose Maria Vaz de Soto
241481
Los Guardianes del Apocalipsis
Robert Ludlum
241482
El gato entre las palomas, diez negritos..
Agatha Christie
241483
La tapadera
Jhon Grisham
241484
Tiempo de Matar
Jhon Grisham
241484-01
Toxina
Robin Cook
241485
Los archivos de Salem
Robin Cook
241485-1
Aurora Boreal
Asa Larsoon
241486
La piel del tambor
Arturo Perez-Reverte
241487
LA comunidad
Helene Flood
241488
EL alquimista impaciente
Lorenzo Silva
241489
La marca del Meridiano
Lorenzo Silva
241490
Los cuerpos extraños
Lorenzo Silva
241490-01
El juego del Alma
Javier Castillo
241491
El cuco de Cristal
Javier Castillo
241492
Todo lo que sucedio con Miranda Huff
Javier Castillo
241492-01
El silencio de la Ciudad Blanca
Eva Mª Saenz de Urturi
241493
Los ritos del Agua
Eva Mª Saenz de Urturi
241494
Los señores del Tiempo
Eva Mª Saenz de Urturi
241495
El libro Negro de las Horas
Eva Mª Saenz de Urturi
241496
El Angel de la Ciudad
Eva Mª Saenz de Urturi
241497
Rey Blanco
Juan Gomez-Jurado
241498
Loba Negra
Juan Gomez-Jurado
241498-01
El emblema del Traidor
Juan Gomez-Jurado
241499
El Espia de Dios
Juan Gomez-Jurado
241499-01
Contrato con DIos
Juan Gomez-Jurado
241500
Todo Arde
Juan Gomez-Jurado
241501
Reina Roja
Juan Gomez-Jurado
241502
Cicatriz
Juan Gomez-Jurado
241503
Angeles y Demonios
Dan Brown
241504
El codigo Da Vinci
Dan Brown
241505
Infierno
Dan Brown
241506
El simbolo perdido
Dan Brown
241506-01
Origen
Dan Brown
241506-02
Puerto Escondido
Maria Oruña
241507
Un lugar a donde ir
Maria Oruña
241508
Lo que la marea esconde
Maria Oruña
241509
El Camino del fuego
Maria Oruña
241510
Donde Fuimos invencibles
Maria Oruña
241511
Desesperacion
Stephen King
241512
Mr Mercedes
Stephen King
241512-01
Billy Summers
Stephen King
241513
Amigo Imaginario
Stephen Chbosky
241514
Nunca
Ken Follet
241515
La bestia
Carmen Mola
241516
Las Madres
Carmen Mola
241517
La novia Gitana
Carmen Mola
241518
La Red Purpura
Carmen Mola
241519
La sombra
Jhon Katzenbach
241520
El hombre equivocado
Jhon Katzenbach
241520-01
El asesinato de Pitagoras
Marcos Chicot
241521
La muerte: Un amanecer
Elisabeth Kübler-ross
241522
Crimenes para una Exposicion
Juan Bolea
241523
La señal de la Cruz
Glenn Cooper
241524
El maestro del Prado
Javier Sierra
241525
A merced de un DIos salvaje
Andres Pascual
241526
La reina en el palacio de las corrientes de aire
Stieg Larsson
241527
La chica que soñaba con una cerilla y un bidon de gasolina
Stieg Larsson
241527-01
Los hombres que no amaban a las mujeres
Stieg Larsson
241527-02
El Ocho
Katherine Neville
241528
LA historiadora
Elisabeth Kostova
241529
Verano Negro
M.W. Craven
241530
El show de las Marionetas
M.W. Craven
241530-01
Entre la promesa del verano y el frio del invierno
Leif GW Persson
241531
La sangre del Pelicano
Miguel Aranguren
241532
Una novela de Barrio
Francisco Gonzales Ledesma
241533
Las Perlas Peregrinas
Manuel Lope
241534
El cuento numero trece
Diane Setterfield
241535
El fin de los Escribas
Glenn Cooper
241536
El libro de las Almas
Glenn COOper
241537
La cara norte del Corazon
Dolores Redondo
241538
Ofrenda a la Tormenta
Dolores Redondo
241539
Legado en los Huesos
Dolores Redondo
241540
El guardian invisible
Dolores Redondo
241541
Dragones de Papel
Rafa Melero Rojo
241542
El laberinto de la Rosa
Tatiana Hardie
241543
La Ladrona de Huesos
Manel Loureiro
241544
El Juego del Ripper
Isabel Allende
241545
Escrito en el agua
Paula Hawkins
241546
No decepciones a tu padre
Carme Chaparro
241547
Delito
Carme Chaparro
241548
La quimica del odio
Carme Chaparro
241548-01
No soy un Monstruo
Carme Chaparro
241548-02
No salgas de Noche
Stacy Willinghan
241549
Sangre derramada
Asa Larsson
241550
El Cebo
Jose Carlos Somoza
241551
Las joyas del Paraiso
Donna Leon
241552
EL hombre inquieto
Henning Mankell
241553
Los crimenes de Alicia
Guillermo Martinez
241554
El mentalista
Camila Läckberg
241555
Mujeres que no perdonan
Camila Läckberg
241556
La secta
Camila Läckberg
241557
Una jaula de oro
Camila Läckberg
241558
Los gritos del pasado
Camila Läckberg
241559
Crimen en directo
Camila Läckberg
241560
Las hijas del frio
Camila Läckberg
241561
Los tontos Mueren
Mario Puzo
241562
El padrino
Mario Puzo
241563
Asesinato de Calidad
Jhon Le Carre
241564
El jardinero fiel
Jhon Le Carre
241565
Nuestro Juego
Jhon Le Carre
241566
EL nombre de la Rosa
Umberto ECO
241567
La niebla Herida
Joaquin M. Barrero
241568
Una Mañana de Marzo
Joaquin M. Barrero
241569`;
Estanteria juvenil
juvenil

Tres cuentos
Arturo Uslar Pietri
250600
Perucho, un paje en la corte
Hpólito Escolar
250601
Del seto de oriente y otros relatos fantásticos
Antonio Martínez Menchén
250602
La triple dama
Julián Ibáñez
250603
Hoces del duratón
Ignacio Sanz
250604
Se buscan cuadros rojos y negros
Alejandro Fernández Pombo
250605
Quiosco, mi amigo
Isabel Agüera de Espejo-Saavedra
250606
El vuelo del Cormorán
Eduardo De Benito
250607
El vuelo del Cormorán
Eduardo De Benito
250608
Elieta
Xavier Bertran
250609
Noche de enigmas
Ignacio Sanz
250610
Los demonios de Barcelona
Lluís Bosch
250611
Tiempo robado
Pablño Guillermo García
250612
La espada negra
Blanca Álvarez
250613
Betsabé nunca duerme
Carmen Gómez Ojea
250614
Agualuna
Joan Manuel Gisbert
250615
El secreto del lago
Alfredo Griñán
250616
Enviado especial al polo sur
Luis Pancorbo
250617
África a los quince años
Bárbara Meneses
250618
El rey de las alcantarillas
Carlos Freneda
250619
Norte y sur
César Pérez de Tudela
250620
Habitantes de las marismas
Jesús González Green
250621
La sombra del gato
Concha López Narváez
250622
El burlador de sevilla
Tirso de Molina
250623
Cantar de Mio Cid
Ana María Moix
250624
Una casa con encanto
Cristina Macía
250625
El coleccionista de misterios
Gaspar Sánchez Salas
250626
Lecho de musgo
Anja Tuckermann
250627
La mariposa de oro
Eugenio Sotillos
250628
La moto fantástica
Eugenio Sotillos
250629
El hombre de las estrellas
JMªLL. Olive
250630
Panico en las nubes
Eugenio Sotillos
250631
Don Quijote de la mancha
Miguel de Cervantes
250632
El misterio de la serpiente de Isis
Eduardo Averbuj/ Horacio Elena
250633
El robo de la antorcha olimpica
Eduardo Averbuj/ Horacio Elena
250634
Intriga en el rally París-Dakar
Eduardo Averbuj/ Horacio Elena
250635
El enigma del cadáver desaparecido
Eduardo Averbuj/ Horacio Elena
250636
La rebelión de los enanos
Rose Estes
250637
La venganza de los Dragones del arco iris
Rose Estes
250638
El dragón negro
Rose Estes
250639
El tesoro del rey
Tom Mac Gowen
250640
Prisionero de Elderwood
Bruce Algozin
250641
Catacumbas infernales
Margaret Baldwin Weis
250642
Caballero de ilusión
Mary Kirchoff
250643
La garra del dragón
Bruce Algozin
250644
Cuando Hitler robó el conejo rosa
Judith Kerr
250645
Terror sobre dos ruedas
Jake MacKenzie
250646
Mi tigre es lluvia
Carlos Puerto
250647
Acuario
Jan Mark
250648
La ciudad fantasma
Jake MacKenzie
250649
La leyenda del rey Arturo III
T.H.White
250650
La leyenda del rey Arturo IV
T.H.White
250651
Intercambio con un inglés
Christine Nöstlinger
250652
Crónicas de media tarde
Juan Farias
250653
El anillo mágico y otros cuentos populares rusos
Alexandr Nikoláievich Afanásiev
250654
El juego del hater
Raúl Álvarez
250655
Momo
Michael Ende
250656
Batman
Bob Kane
250657
La guía secreta de Harry Potter
Pablo C. Reyna
250658
La cabaña del tío Tom
Harriet Beecher Stowe
250659
El ángel caído
Fernando Lalana
250660
La máquina maravillosa
Elvira Menéndez
250661
La mascota agresiva
Susan Price
250662
Anoche hablé con la luna
Alfredo Gómez Cerdá
250663
Historia de mi infancia
León Tolstoi
250664
Vampiratas: Emboscada en el océano
Justin Somper
250665
Los señores de los cometas
Edward Packard
250666
Lanzarote del lago
José María Carandell
250667
Asedio y caida de Troya
Robert Graves
250668
Cantar de los Nibelungos
Esther Tusquets
250669
El Ramayana
Jose Luis Giménez-Frontín
250670
¡A la mierda la bicileta!
Gonzalo Moure Trenor
250671
Los últimos días de Pompeya
Bulwer Lytton
250672
El perro endemoniado
Capitan Marryat
250673
Extramuros
Jesús Fernández Santos
250674
Langelot y los dinamiteros de Londres 4
Lieutenant X
250675
Langelot y el rascacielos siniestro 5
Lieutenant X
250676
Langelot contra el señor T 6
Lieutenant X
250677
Los cosacos
Leon Tolstoi
250678
Corazon
Edmundo de Amicis
250679
Los hijos del capitan Grant
Julio Verne
250680
Las tribulaciones de un chino de China
Julio Verne
250681
Crimen y castigo
Fedor Dostoiewsky
250682
El príncipe y el mendigo
Mark Twain
250683
La isla misteriosa
Julio Verne
250684
Los mineros de Alaska
Emilio Salgari
250685
Moby Dick
Herman Melville
250686
Taras Bulba
Nicolas Gogol
250687
Leyendas de la Alhambra
Washington Irving
250688
Un yanqui en la corte del rey Arturo
Mark Twain
25088-01
Cartas desde mi molino
Alphonse Daudet
250689
infantil
ESTANTERÍAS INFANTIL
Anónimo
N/A
AZUL
Anónimo
N/A
Un cuento , un besito y a la cama,
Varios autores
254000
¿Has terminado , clara?
Gunilla Hansson
254001
Un bebé para clara
Gunilla Hansson
254002
Clara dice No
Gunilla Hansson
254003
Clara y Pablo
Gunilla Hansson
254004
Pocoyo y la oruga Valentina
Varios autores
254005
Pocoyo y la estrella
Varios autores
254006
Pocoyo envía una carta
Varios autores
254007
Pocoyo juega al escondite
Varios autores
254008
Osito Tito: vamos a construir
Benji Davies
254009
Osito Tito: vamos a jugar
Benji Davies
254010
Osito Tito: safari de dinosaurios
Benji Davies
254011
Osito Tito: la casa encantada
Benji Davies
254012
Osito Tito: vamos al zoo
Benji Davies
254013
Osito Tito: un día en el cole
Benji Davies
254014
Osito Tito: un día en la granja
Benji Davies
254015
Osito Tito: todos al tren
Benji Davies
254016
Osito Tito: bomberos al rescate
Benji Davies
254017
Osito Tito: aventura pirata
Benji Davies
25401701
Siempre te querré pequeñin
Debi Gliori
254018
Un día en la granja
Didier Balicevic
254019
A contar
Varios autores
254020
Animales
Varios autores
254021
Palabras
Varios autores
254022
Colores
Varios autores
254023
La cenicienta libros para tocar
Varios autores
254024
Ves al reves
Jeanne Willis
254025
Telefono
Varios autores
254026
Reloj
Varios autores
254027
Un puré muy especial
Antonio Vicente Lucerga
254028
La risa es la clave
Antonio Vicente Lucerga
254029
El día de la inaguración
Antonio Vicente Lucerga
254030
Flor a la vista
Antonio Vicente Lucerga
254031
El imperio del sol
Inés Díaz Moreno
254032
Calzadas de leyendas
Inés Díaz Moreno
254033
Animales
Varios autores
254034
Numeros
Varios autores
254035
Juega y aprende con mickey Cuadrada
Varios autores
254036
Juega y aprende con mickey Otras formas
Varios autores
254037
Juega y aprende con mickey Todas las formas
Varios autores
254038
Juega y aprende con mickey Uno
Varios autores
254039
Juega y aprende con mickey Dos
Varios autores
254040
Juega y aprende con mickey Tres
Varios autores
254041
Juega y aprende con mickey Cuatro
Varios autores
254042
Juega y aprende con mickey Cinco
Varios autores
254043
Juega y aprende con mickey Rojo
Varios autores
254044
Juega y aprende con mickey Azul
Varios autores
254045
Juega y aprende con mickey Amarillo
Varios autores
254046
Juega y aprende con mickey Rosa
Varios autores
254047
Juega y aprende con mickey Verde
Varios autores
254048
Juega y aprende con mickey Todos los colores
Varios autores
254049
Juega y aprende con mickey Delante y Detrás
Varios autores
254050
Juega y aprende con mickey Grande y Pequeño
Varios autores
254051
Juega y aprende con mickey Dentro y Fuera
Varios autores
254052
Juega y aprende con mickey Cerca y Lejos
Varios autores
254053
Juega y aprende con mickey Arriba y Abajo
Varios autores
254054
Juega y aprende con mickey Letra A
Varios autores
254055
Juega y aprende con mickey Letra E
Varios autores
254056
Juega y aprende con mickey Letra I
Varios autores
254057
Juega y aprende con mickey Letra O
Varios autores
254058
Juega y aprende con mickey Letra U
Varios autores
254059
Juega y aprende con mickey el oido
Varios autores
254060
Juega y aprende con mickey la vista
Varios autores
254061
Juega y aprende con mickey el olfato
Varios autores
254062
Juega y aprende con mickey el tacto
Varios autores
254063
Juega y aprende con mickey el gusto
Varios autores
254064
Cuento de papá
Eugene Ionesco
254064-01
Mi primer carnaval de los animales
Severine Cordier
254064-02
AMARILLO
Anónimo
N/A
Mamá
Susanna Isern
254065
Kónik el esquimal
Xavier Botet
254066
Kónik y la ballenas
Xavier Botet
254067
Kónik y el rio
Xavier Botet
254068
Que será eso del amor, Minimoni
Rocio Bonilla
254069
La bibliotecaria
Sandra Alonso
254070
Que bigotes me pasa
María Leach
254071
El sueño de pablo
Antonio Ventura
254072
Como desenfadar a una mamá en 10 pasos
Marine Paris
254075
Monstruo Rosa
Olga de dios
254076
Monstruo Azul
Olga de dios
254077
El monstruo de colores
Anna Llenas
254078
El monstruo de colores va al cole
Anna Llenas
254079
El viaje de Marina
Margalida Amorós Bauzà
254080
Zapatos nuevos
Julia Solans
254081
El cofre de la amistad
Raquel Díaz Reguera
254082
De que color es un beso
Rocio Bonilla
254083
Como pedir disculpas
David LaRochelle
254084
Mi camita
JS Pinillos
254085
Emocionario
Cristina Nuñez Pereira
254086
Unos zapatos nuevos
Pilar Ramos
254087
A veces mamá tiene truenos en la cabeza
Bea Taboada
254088
A veces mamá tiene truenos en la cabeza
Bea Taboada
254089
Mamo
Alejandra Castello
254090
El cuento que quería ser leido
Carolina Rabei
254091
Te quiero casi siempre
Anna LLenas
254092
Tu cuerpo es tuyo
Lucía Serrano
254093
El secreto de la amistad
Canizales
254094
Nos tratamos bien
Lucía Serrano
254095
Que necesito cuando tengo enfado
Tania García
254096
Que necesito cuando tengo miedo
Tania García
254097
Invisible
Eloy Moreno
254098
Adios miedo Hola seguridad
Ana Serna
254099
El viaje de pancho
Antonio Santos
254100
Los secretos de la luna
Ricardo Alcantara
254101
Rosa caramelo
Adela Turin
254102
T-Rex
Jeanne Willis
254103
Olivia
Ian Falconer
254104
Mar yoyo
Desiree Acevedo
254105
Come noches
Ana Juan
254106
Tengo un volcán
Miriam Tirado
254107
El hilo invisible
Miriam Tirado
254108
Caperucita Roja / Little Red Riding-Hood
Varios autores
254109
El manzano
Mira Lobe/Angelika Kaufmann
254110
Navidad: villancicos, pastorelas, posadas y piñatas
Varios autores
254111
Plabras para jugar
MªDolores González Gil
254112
Samsam 1: ¡Una familia cósmica!
Serge Bloch
254113
Samsam 2: ¡Eres el mejor, SamSam!
Serge Bloch
254114
Hundirse y flotar
Mike y María Gordon
254115
Adiós, celos. ¡Hola, confianza!
Ana Serrano/ Henar Íñigo
254116
Pájaro amarillo
Olga de dios
254117
Los cuatro amigos
J. y W. Grimm / Gabriel Pacheco
254118
Chivo Chivones
Varios autores
254119
La cebra Camila
Marisa Nuñez/Oscar Villán
254120
Eres como...
Desirée Acevedo
254121
De mayor quiero ser...feliz
Anna Morató García
254122
Chuf-Chuf
Jorge Zentner/Philip Stanton
254123
Frozen: Mi orimer busca y encuentra
Jennifer H. Keast
254124
El elefante encadenado
Jorge Bucay
254125
La cenicienta
Susaeta
254126
El pequeño ciudadano
Varios autores
254127
La tiranosauria
Michelle Robinson/Deborah Allwright
254128
La casa de Ana
Norman Messenger
254129
Rana de tres ojos
Olga de dios
254130
Los 12 meses del año
Peggy Nille
254131
Los dinosaurios
Sandra Laboucarie/Peggy Nille
254132
Los dinosaurios
Sandra Laboucarie/Peggy Nille
254133
La bella durmiente
Alberto Szpunberg
254134
Pinocho
Carlo Collodi
254135
Los tres cerditos
Emilo Lopez
254136
Pulgarcito
Emilo Lopez
254137
Peter Pan
Emilo Lopez
254138
Cenicienta
Alberto Szpunberg
254139
El flautista de hamelin
Emilo Lopez
254140
El patito feo
Daniel Gimeno
254141
El soldadito de plomo
Emilo Lopez
254142
El traje nuevo del emperador
Emilo Lopez
254143
El gigante egoista
Oscar Wilde
254144
Aladino y la lampara maravilosa
Varios autores
254145
La sirenita
Alberto Szpunberg
254146
Estanteria 7
Las Aventuras de Allan Quaterman
H. Rider Haggard
241900
Escuela de Robinsones
Julio Verne
241901
La estrella de la Araucana
Emilio Salgari
241902
Quintin Durward
Sir Walter Scott
241903
La Jandaga I
Julio Verne
241904
La Ley de Lynch I
Gustave Aimard
241905
Las Aventuras de Arturo Gordon PYM
Edgar Allan Poe
241906
La Flecha negra
Robeto Luis Stevenson
241907
El Crucero del Dazzler
Jack London
241908
A traves del Destino II
Enrique Sienkiewicz
241909
Ismael
Eduardo Acevedo Diaz
241910
Isla de Coral
Robert M. Ballantyne
241911
Quintin Durward
Sir Walter Scott
241912
La estrella de la Araucana
Emilio Salgari
241913
La Jandaga II
Julio Verne
241914
La Ley de Lynch II
Gustave Aimard
241915
Ismael
Eduardo Acevedo Diaz
241916
El cazador de Ciervos
Fenimore Cooper
241917
P`TT Bonhomme
Julio Verne
241918
La jangada II
Julio Verne
241919
A traves del Destino I
Enrique Sienkiewicz
241920
p`TT Bonhomme
jUlio Verne
241921
El Cazador de Ciervos I
Fenimore Cooper
241922
El Cazador de Ciervos II
Fenimore Cooper
241923
El Crucero del Dazzler
Jack London
241924
Oceola, El gran Jefe de los Seminolas
Mayne Reid
241925
Nuestra Señora de Paris II
Victor Hugo
241926
¡Viva el Pueblo!
German Sanchez Espeso
241927
Las Mil y una Noches
Anonimo
241928
Los Vagabundos
Jack London
241929
El batiscafo
Georges Houot y Pierre Willm
241930
Navegado con los piratas Chinos
Aleko E. Lilius
241931
El prisionero de Zenda
Antonio Hope
241932
Los Cañones de Navarone
Alistair MacLean
241933
La biblioteca de córdoba
Andrea D. Morales
241934
El niño que perdió la guerra
Julia Navarro
241935
El Conde de Montecristo
Alexandre Dumas
241936
Últimas pasiones del caballero almafiera
Juan Eslava Galán
241937
La iliada
Homero
241938
El paciente
Juan Gómez Jurado
241939
Corazón de tinta
Cornella Funke
241940
La biblioteca de los muertos
Glenn Cooper
241941
1794
Niklas Natt Och Dag
241942
Ilión
Mario Villén
241943
Las puertas de Atenas
Conn Iggulden
241944
El latido del mar
Jorge Molist
241945
Madrid era una fiesta
Pedro Herrasti
241946
El sepulturero y el crimen de la cripta
Oliver Pötzsch
241947
Hijo del fuego
Sherrilyn Kenyon
241948
Emma
Jane Austen
241949
Catedral
Juan Eslava Galán
241950
Una navidad escocesa
Mónica Gutiérrez
241951
Una navidad escocesa
Mónica Gutiérrez
241952
El fuerte de la florida
Santiago Mazarro
241953
Juego de Tronos
George R.R. Martin
241954
Choque de reyes
George R.R. Martin
241955
Tormenta de espadas
George R.R. Martin
241956
Festín de cuervos
George R.R. Martin
241957
Danza de dragones
George R.R. Martin
241958
El don de la lluvia
Tan Twan Eng
241959
El niño
Fernando Aramburu
241960
El nombre del viento
Patrick Rothfuss
241961
La música del silencio
Patrick Rothfuss
241962
Sed de amor
Kresley Cole
241963
Lo que habita en los sueños
Nagore Suárez
241964
Cuento de hadas
Stephen King
241965
La otra parte
Alfred Kubin
241966
El señor de los anillos la comunidad del anillo
J.R.R. Tolkien
241967
El señor de los anillos las dos torres
J.R.R. Tolkien
241968
El señor de los anillos el retorno del rey
J.R.R. Tolkien
241969
Un cuento perfecto
Elísabet Benavent
241970
El árbol del verano
Guy Gavriel Kay
241971
Fuego Errante
Guy Gavriel Kay
241972
Pioneras
Carmen García
241973
La piedra y la espada
Jack Whyte
241974
El conde de Montecristo I
Alejandro Dumas
241975
El conde de Montecristo II
Alejandro Dumas
241976
Fundación
Isaac Asimov
241977
Blade Runner
Philip K. Dick
241978
Fahrenheit 451
Ray Bradbury
241979
Dune I
Frank Herbert
241980
Dune II
Frank Herbert
241981
Olvidado rey Gudú I
Ana María Matute
241982
La carta esférica
Arturo Pérez-Reverte
241983
Siete casas en Francia
Bernardo Atxaga
241984
Kalhat
Blas Meca
241985
Cuatro nocturnos
José María Merino
241986
La mente araña y otros relatos
Fritz Leiber
241987
La aventura del tocador de señoras
Eduardo Mendoza
241988
Pesadillas Victorianas
R.W. Chambers
241989
El alfil blanco
Luis Martín Ruiz
241990
La sonrisa secreta de la luna
Francisco Cañabate Reche
241991
El rojo emblema del valor
Stephen Crane
241992
Un viejo que leia novelas de amor
Luis Sepúlveda
241993
Scaramouche
Rafael Sabatini
241994
Un yanqui en la Corte del rey Arturo
Mark Twain
241995
De la Tierra a la Luna
Julio Verne
241996
Viaje al centro de la Tierra
Julio Verne
241997
La isla misteriosa
Julio Verne
241998
El abuelo
Benito Pérez Galdós
241999
La esfinge de los hielos
Julio Verne
242000
Muerte en Tiahuanaco
Ángel Quiroga
242001
El barco de la muerte
B. Traven
242002
Las inquietudes de Shanti Andía
Pío Baroja
242003
El buscón
Francisco de Quevedo
242004
El camino
Miguel Delibes
242005
La regenta
Leopoldo Alas "Clarín"
242006
Fortunata y Jacinta, 1
Benito Pérez Galdós
242007
Fortunata y Jacinta, 2
Benito Pérez Galdós
242008
Lazarillo de Tormes
Anónimo
242009
Juan Valera
Pepita Jiménez
242010
La familia de Pascual Duarte
Camilo José Cela
242011
Mazurca para dos muertos
Camilo José Cela
242012
Señora de rojo sobre fondo gris
Miguel Delibes
242013
Háblame a los ojos
Pepita Cedillo Vicente
242014
Don Quijote de la Mancha
Miguel de Cervantes
242015
Entrevista con el vampiro
Anne Rice
242016
American Psycho I
Bret Easton Ellis
242017
American Psycho II
Bret Easton Ellis
242018
El exorcista
William Peter Blatty
242019
El resplandor I
Stephen King
242020
El resplandor II
Stephen King
242021
Rebeca I
Daphne Du Maurier
242022
Rebeca II
Daphne Du Maurier
242023
666
Hugo Wast
242024
El silencio de los corderos
Thomas Harris
242025
El silencio de los corderos
Thomas Harris
242026
La huésped
Stephenie Meyer
242027
Lo que esconde tu nombre
Clara Sánchez
242028
Lo que esconde tu nombre
Clara Sánchez
242029
Drácula, el no muerto
Dacre Stoker
242030
Nunca volverás
Hans Koppel
242031
La hora del mar
Carlos Sisí
242032
Hannibal- El origen del mal
Thomas Harris
242033
Frankenstein
Mary W. Shelley
242034
La joya de las siete estrellas
Bram Stoker
242035
La casa de los siete tejados
Nathaniel Hawthorne
242036
La sombra del Silencio
Hitchcock
242037
Mahoma
Washington Irving
242038
Clásicos de bolsillo
Anónimo/Cervantes/Quevedo
242039
Miau
Benito Pérez Galdós
242040
El ingenioso Hidalgo Don Qvixote de la Mancha
Miguel de Cervantes
242041
Señora de rojo sobre fondo gris
Miguel Delibes
242042
Pepita Jiménez
Juan Valera
242043
Novelas ejemplares II
Cervantes
242044
Lazarillo de Tormes
Anónimo
242045
Las ratas
Miguel Delibes
242046
Trafalgar: La corte de Carlos IV
Benito Pérez Galdós
242047
El sombrero de tres picos
Pedro Antonio de Alarcón
242048
El sombrero de tres picos
Pedro Antonio de Alarcón
242049
La familia de Pascual Duarte
Camilo José Cela
242050
La familia de Pascual Duarte
Camilo José Cela
242051
Marianela
Benito Pérez Galdós
242052
El amante liberal
Miguel de Cervantes
242053
El árbol de la ciencia
Pío Baroja
242054
Las tres sorores
Ramón J.Sender
242055
El camino
Miguel Delibes
242056
San Camilo 1936
Camilo José Cela
242057
Don Quijote de la Mancha II
Miguel de Cervantes
242058
  try {
    // Llamada a tu Ollama local a través de Ngrok
    const response = await fetch(`${URL_LOCAL}/api/chat`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true" // Evita la pantalla de advertencia de Ngrok
      },
      body: JSON.stringify({
        model: "llama3.2:3b", // Asegúrate de haber hecho 'ollama pull llama3' en tu PC
        messages: [
          { role: "system", content: instruccionesSistema },
          ...contentsValido.map(msg => ({
            role: msg.role === "model" ? "assistant" : "user",
            content: msg.parts[0].text
          }))
        ],
        stream: false
      })
    });

    const data = await response.json();
    
    // Devolvemos la respuesta en el formato que tu index.html ya entiende
    return res.status(200).json({ reply: data.message.content });

  } catch (error) {
    console.error("ERROR OLLAMA LOCAL:", error);
    return res.status(500).json({ error: "No se pudo conectar con el servidor de la biblioteca" });
  }
}
