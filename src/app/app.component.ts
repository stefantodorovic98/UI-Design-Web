import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Pandica';

  constructor() {
    const worker = {
      id: 0,
      type: 'worker',
      username: 'petar',
      password: 'sifra123',
      firstname: 'Petar',
      lastname: 'Petrovic',
      phone: '123456789',
      address: 'Bulevar kralja Aleksandra'
    };
    const visitor1 = {
      id: 1,
      type: 'visitor',
      username: 'vuk',
      password: '12345',
      firstname: 'Vuk',
      lastname: 'Vukovic',
      phone: '987123456',
      address: 'Despota Stefana'
    };
    const visitor2 = {
      id: 2,
      type: 'visitor',
      username: 'marko',
      password: 'sifra321',
      firstname: 'Marko',
      lastname: 'Markovic',
      phone: '987654321',
      address: 'Bulevar Nikole Tesle'
    };

    let userArray = [worker, visitor1, visitor2];
    localStorage.setItem('users', JSON.stringify(userArray));

    const tiger = {
      id: 0,
      name: 'Tigar',
      description:`Tigar (lat. Panthera tigris) je sisar iz porodice mačaka (Felidae)
      i jedan od četiri vrste „velikih mačaka“ roda pantera (Panthera).
      On je vrhunski predator i najveća živa mačka na svetu.
      U brojnim istorijskim mitovima istočnjačkih zemalja tigar je kralj svih zveri.
      Kao ugrožene vrste, većina svetskih tigrova danas živi u zatočeništvu ljudi.`,
      image: 'assets/animals/tigar.jpg',
      comments: []
    };

    const vulture = {
      id: 1,
      name: 'Beloglavi sup',
      description: `Beloglavi sup (lat. Gyps fulvus) je velika ptica lešinar iz familije Accipitridae.
      Kao i drugi lešinari hrani se strvinama, pretežno uginulim životinjama koje
      nalazi
      krstareći nebom širokim područjima, često leteći u jatima.
      Često grokće i šišti naročito kada se hrani.
      Gnezdi se na liticama planina ležući po jedno jaje. Ponekad formiraju kolonije.`,
      image: 'assets/animals/lesinar.jpg',
      comments: []
    };

    const piranha = {
      id: 2,
      name: 'Pirana',
      description: `Pirana (latinski: pygocentrus piraya)
      je slatkovodna riba iz porodice
      Characidae iz reda Characiformes rasprostranjena po rekama
      i jezerima
      Južne Amerike. Poznata je po svojim oštrim zubima.
      Iako se često opisuju
      kao ekstremno predatorske i uglavnom se hrane ribom. Njihove prehrambene
      navike se znatno razlikuju, a takođe konzumiraju biljni materijal.
      Klasifikuju se kao omnivori.`,
      image: 'assets/animals/pirana.jpg',
      comments: []
    };

    const wolf = {
      id: 3,
      name: 'Vuk',
      description: `Vuk (lat. Canis lupus), poznat i kao sivi vuk, vrsta je iz roda Canis
      koja živi u divljini i udaljenim područjima Evroazije i Sjeverne Amerike.
      Najveći je postojeći član svoje porodice. Razlikuje se od ostalih vrsta roda
      Canis po manje
      istaknutim osobinama, naročito na ušima i njušci.
      Zimsko krzno je dugo i gusto i pretežno šareno sive boje.`,
      image: 'assets/animals/vuk.jpg',
      comments: []
    };

    const bear = {
      id: 4,
      name: 'Medved',
      description: `Medvedi (ijek. medvjedi; lat. Ursidae) su porodica krupnih sisara iz reda
      zveri.
      Medvedi žive u različitim staništima, od tropskih do polarnih i od
      planinskih do
      ravničarskih. Od staništa zavisi način ishrane medveda,
      mada je većina vrsta medveda
      omnivorna. Najveći broj vrsta medveda se
      hrani korenjem, bobicama, ribom.`,
      image: 'assets/animals/medved.jpg',
      comments: []
    };

    const fox = {
      id: 5,
      name: 'Lisica',
      description: `Lisice su sisari manje ili osrednje veličine i pripadaju nekolikim rodovima
      porodice pasa (lat. sanidae). Imaju pljosnatu lobanju, uspravne trouglaste uši,
      zašiljenu, blago okrenutu njušku i dugi grmoliki rep.Lisice su lovljene uz
      pomoć
      čopora pasa gonič. Izvožene su u razne delove novog sveta od strane evropskih doseljenika.`,
      image: 'assets/animals/lisica.jpg',
      comments: []
    };

    const badger = {
      id: 6,
      name: 'Jazavac',
      description: `Jazavac ili evropski jazavac (lat. Meles meles) je vrsta životinje iz roda jazavac (lat. Meles), koji pripada porodici kuna. Uglavnom živi u odajama ispod zemlje koje sam kopa,
      a koje su hodnicima povezane sa površinom.
      Jazavac je pretežno
      noćna životinja, tako da ima slabo razvijen vid, nešto bolje razvijen sluh
      i odlično razvijeno čulo mirisa.`,
      image: 'assets/animals/jazavac.jpg',
      comments: []
    }

    const bee = {
      id: 7,
      name: 'Pčela',
      description: `Pčele su leteći insekti, bliski rođaci bumbara, a dalji ose i mrava.
      Na svijetu ima približno 20 000 vrsta pčela, te se nalaze na svim
      kontinentima osim Antarktika. Hrane se nektarom primarno kao izvorom
      energije, te polenom, kao izvorom proteina.`,
      image: 'assets/animals/pcela.jpg',
      comments: []
    };

    const frog = {
      id: 8,
      name: 'Žaba',
      description: `Žabe pripadaju vodozemcima, a razlikuju se od drugih vodozemaca
      po tome
      što nemaju rep. Tijelo im je takođe drugačije.
      Zadnje noge su im znatno
      duže od prednjih, na kojim se
      nalazi 4 ili 5 prstiju. Zadnje noge su
      prilagođene za
      tzv. katapultarni skok.`,
      image: 'assets/animals/zaba.jpg',
      comments: []
    };

    const giraffe = {
      id: 9,
      name: 'Žirafa',
      description: `Žirafa (Giraffa camelopardalis) je afrički sisar iz reda papkara, najviši od
      svih
      kopnenih životinja. Žirafe su srodstvu sa jelenima, antilopama i
      govedima, ali su
      grupisane u zasebnu familiju, familiju žirafa (Giraffidae)
      u koju još spada njihov
      najbliži rođak, okapi. Žirafe žive na prostoru od
      Čada do Južne Afrike.`,
      image: 'assets/animals/zirafa.jpg',
      comments: []
    };

    let animalArray = [
      tiger,
      vulture,
      piranha,
      wolf,
      bear,
      fox,
      badger,
      bee,
      frog,
      giraffe
    ];
    localStorage.setItem('animals', JSON.stringify(animalArray));

    const bronze = {
      id: 0,
      name: 'Bronze paket',
      description: `Boravak 2h u zoološkom vrtu uz pratnju vodiča!
      Sok gratis!`,
      image: 'assets/packets/bronze_paket.jpg'
    };

    const silver = {
      id: 1,
      name: 'Silver paket',
      description: `Boravak 4h u zoološkom vrtu uz pratnju vodiča!
      Sok i sendvič gratis!`,
      image: 'assets/packets/silver_paket.jpg'
    };

    const gold = {
      id: 2,
      name: 'Gold paket',
      description: `Boravak 4h u zoološkom vrtu uz pratnju vodiča!
      Slikanje sa papagajem!
      Sok, sendvič i sladoled gratis!`,
      image: 'assets/packets/gold_paket.jpg'
    };

    let packetArray = [bronze, silver, gold];
    localStorage.setItem('packets', JSON.stringify(packetArray));

    const tigar_event = {
      id: 0,
      title: 'Tigrovi dani',
      description: `Od 24.04. do 29.04.
      dođite i povedite svoje
      najmilije!
      Za najmlađe će biti
      organizovane radionice!`,
      likes: 48,
      image: 'assets/zoo_events/tigar_event.jpg'
    };

    const vodozemci_event = {
      id: 1,
      title: 'Sa vodozemcima na ti',
      description: `Da li želite da saznate sve
      o vodozemcima?
      Dođite 31.08. i naučite
      nešto novo!
      Kupci ulaznice za Gold
      paket dobijaju igračku
      žabu na poklon!`,
      likes: 17,
      image: 'assets/zoo_events/vodozemci_event.jpg'
    };

    const lesinar_event ={
      id: 2,
      title: 'Sve o beloglavim supovima',
      description: `Dana 21.09. će se održati
      posebna radionica o beloglavim
      supovima!
      Tog dana će ulaznice za
      Bronze i Silver pakete biti
      snižene 30%!`,
      likes: 52,
      image: 'assets/zoo_events/lesinar_event.jpg'
    };

    const pcela_event = {
      id: 3,
      title: 'Pčela - čuvar sveta',
      description: `Zašto su pčele bitne?
      Kako nastaje med?
      Odogovor na ova pitanja
      i na mnoga druga ćete
      dobiti na specijalnoj
      radionici koja će se održati
      29.09. u našem zoološkom
      vrtu!
      Vidimo se :)`,
      likes: 104,
      image: 'assets/zoo_events/pcela_event.jpg'
    };

    const pirana_event = {
      id: 4,
      title: 'Pirane',
      description: `Sve o ovoj interesantnoj vrsti
      ribe ćete moći da saznate
      3.10. u 12h. Tada će u našem
      zoološkom vrtu da održi
      radionicu jedan od najvećih
      ihtiologa današnjice,
      dr John Harris!`,
      likes: 12,
      image: 'assets/zoo_events/pirana_event.jpg'
    };

    let eventArray = [
      tigar_event,
      vodozemci_event,
      lesinar_event,
      pcela_event,
      pirana_event
    ];
    localStorage.setItem('events', JSON.stringify(eventArray));

    let requestArray: Object[] = [];
    localStorage.setItem('requests', JSON.stringify(requestArray));

    let notificationsArray: Object[] = [];
    localStorage.setItem('notifications', JSON.stringify(requestArray));
  }


}
