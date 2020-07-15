# Grundlegendes
Dieses Projekt ist eine Studienarbeit im Fach "Praxis Projekt" an der Hochschule Ansbach. Die Dokumentation ist so geschrieben, dass nach dem durchlesen ein möglichst einfacher Wiedereinstieg möglich ist.

Projekt-Teilnehmer: Johannes Munker (@[jomunker](https://github.com/jomunker)), Lisa Okezie (@[lisaokezie](https://github.com/lisaokezie)), Markus Schranz  (@[maadc](https://github.com/maadc))  
Verwendete Techniken: [Angular](https://angular.io/)(frontend), [Angular Material](https://material.angular.io/) (frontend Design), [node.js](https://nodejs.org/en/) (server), [socket.io](https://socket.io/) (realtime collaboration framework), [NeDB](https://github.com/louischatriot/nedb/) (datenbank)

## Fragestellungen
**Wie sieht die konkrete Aufgabenstellung aus?**   
Ein unendlich großes Whiteboard. Zentral verfügbar und von allen Mitgliedern gleichzeitig editierbar. Individuelle Gestaltung durch Module. Alle Module sind verschiebbar.

**Ziele, Zielsetzung. Wem soll das Projekt wofür dienen?**   
Ein Projektorganisations-Tool für Studenten (für Gruppenarbeiten)

**Maßgeschneiderte Lösung oder eher Plattform für verschiedene Anwendungen?**   
Keine maßgeschneiderte Lösung. Das Whiteboard wird durch unterschiedliche Module maximal anpassbar.

**Hosting? Individuell? oder SaaS (Software as a Service)?**   
Als Ergebnis soll ein Datei-Paket entstehen, welches einfach auf den privaten Server hochgeladen werden kann. Dann kann es schon losgehen!

**Mit wem könnte man das Produkt erproben/testen?**   
Studenten, bzw. jeder der aktuell ein Projekt hat.

**Kriterien für einen erfolgreichen Abschluss des Projekts?**   
Ein Tool mit dem wir diese Studienarbeit hätten durchplanen können.

## Aufbau
Das Projekt hat zwei zentrale Komponenten. Das Front-End im Ordner _/angular_ und der node.js-Server im Ordner _/server_. Im Folgenden wird auf diese beiden nacheinander genauer eingegangen.

Generell ist die Art und Weise Darstellung in [/components](#components) manifestiert. Die Logik und Funktionsweise ist in einzelnen [/services](#services) ausgelagert.

## Begriffe
**Komponente / Component:** Beschreibt das [ng-component](https://angular.io/guide/displaying-data) von Angular selbst.   
**Modul:** Ein einzelnes Element das auf dem Whiteboard dargestellt wird. Arten: Text, Bild, Checkliste

## Socket.io
Eine kurze grundlegende Erklärung über die Funktionsweise von socket.io.

Es gibt zwei Arten von Nachrichten, die zwischen Client und Server ausgetauscht werden. `socket.emit()` heißt Nachricht senden und `socket.on()` wird ausgeführt, wenn eine Nachricht eintrifft. Dabei ist es entweder ein Client an den Server oder der Server an alle Clients. Es gibt auch die Möglichkeit an alle, außer den initiierenden Client zu senden - Stichwort: Broadcast.   
Mit jeder Nachricht lassen sich Objekte, Strings usw. mitschicken. 

Durch diesen konstanten Austausch wird der Eindruck von Änderungen in Echtzeit vermittelt. Doch eigentlich werden ständig Daten von dem ändernden Client an alle anderen verteilt.

**Beispiel:** Wenn ein Client eine Chatnachricht sendet, wird diese nicht lokal gespeichert, sondern es wird im Hintergrund ein `socket.emit()` ausgeführt. Die Nachricht wird an den Server geschickt und mit `socket.on()` empfangen. Die empfangende Nachricht wird dann sofort wieder an alle mit `socket.emit()` geschickt. Auch der sendende Client bekommt die Nachricht. Die Nachricht wird dann in die Array `chatRecord` eingefügt und von Angular automatisch im Frontend angezeigt.

## Angular Material
Dieses Framework bringt nicht nur hübsche Design-Elemente und Styles mit. Wir bereichern uns an den zusätzlichen Funktionen: [Modul-Verschiebung mit Drag-Drop](https://material.angular.io/cdk/drag-drop/overview) und der [Seitennavigation](https://material.angular.io/components/sidenav/overview) in der unser Chat verborgen liegt.

# /angular/app/src

## /components
Alle offensichtlichen Abschnitte in unserem Front-End sind auf einzelne Components aufgeteilt. Vorteil ist die Übersichtlichkeit und wir können gleichzeitig an unterschiedlichen Components arbeiten, ohne uns in die Quere zu kommen.

### /canvas
Diese Komponente bildet das eigentliche Whiteboard, die eigentliche "editierbare Fläche" ab. Alle Module werden in einer Array  im [_canvasmodule.service.ts_](#canvasmodule) gespeichert. Dieses Array wird mit der [*ngFor](https://angular.io/api/common/NgForOf#description)-Schleife ausgegeben und im frontend angezeigt.   
Die Modul-Objekte haben einen Parameter _type_. Mit `*ngIf` können wir den Parameter jedes Objektes in der Array überprüfen und so das Objekt in die passende HTML-Struktur einbinden.

Zusätzliche Aufgaben für diese Komponente befinden sich in `canvas.component.ts`:
* ngOnInit(): Bei Initialisierung der Seite werden alle Module und Settings aus der Datenbank geladen. Danach werden die einzelnen Sockets angeschaltet (mit `socket.on()`), sodass sie auf einzelne Emits hören und dann die veränderten Module verarbeiten.
* dragEnd(): Alle Module sind wegen dieser Funktion beweglich. Das [Cdk-Event DragEnd](https://material.angular.io/cdk/drag-drop/overview) liefert die zurückgelegte Diszant, diese verrechnen wir dann mit der aktuellen Position. Zusätzlich wird überprüft, ob die Module an die jeweiligen Ränder stoßen und die Begrenzung einhalten.
* onResizeEnd(): Nachdem die Größe eines Objektes verändert wird, feuert Angular das ResizeEvent. Wir verwenden für das resizing eine externe Bibliothek: [angular-resizable-element](https://www.npmjs.com/package/angular-resizable-element)

Alle Änderungen in dieser Componente werden an den [_canvasmodule.service.ts_](#canvasmodule) weiter gegeben, weil dieser die Array mit den einzelnen Modulen verwaltet.


### /chat
In diesem Ordner befindet sich die Logik für den Chat, der sich hinter der Seitenleiste versteckt. Ähnlich wie die [canvas](#canvas)-Komponente kommuniziert diese mit dem zugehörigen Service [_chat.service.ts_](#chat-1). Falls eine Nachricht abgeschickt, oder gelöscht wird, finden Funktionsaufrufe statt. Die Nachricht wird an den [_chat.service.ts_](#chat-1) übergeben, der sich um die weitere Verarbeitung kümmert.

Die Ausgabe-Logik befindet sich aber in _chat.component.html_. Mit einer *ngFor-Schleife werde die einzelnen Nachrichten angezeigt. Neue Nachrichten werden immer unten angezeigt. Falls der Platz für die Nachrichten nicht reicht, verlängert sich die Anzeige. Per Maus-Scroll können so alle Nachrichten überblickt werden.

### /header
Dieser Komponente verarbeitet alle Inhalte der Kopfzeile. Settings und Chet befinden sich in einem jeweiligen Side-Menü rechts. Das führt bei Angular zu einer Error Message: _Error: A drawer was already declared for 'position="end"'_
Eigentlich darf nur ein Side-Menü auf einer Seite existieren. Wir haben uns aus UX-Gründen trotz Fehlermeldung für zwei Side-Menüs auf einer Seite entschieden. 

Der Chat kann auf Knopfdruck geöffnet werden, dabei wird ein POST-Request ausgeführt, der alle Chatnachrichten aus der Datenbank holt.

Die Nutzereinstellungen können auf Knopfdruck geöffnet werden. Hier lässt sich der Boardname und das Colortheme anpassen.

### /root
Das ist die Wurzel-Komponente. Der Einstieg in die Anwendung und alle anderen Components werden eingebunden. Die grundlegende HTML-Struktur wird in dieser Komponente definiert. CSS-Styles und HTML-Tags bestimmen den Ort und das Design der spezialisierten Komponenten.

Die `root.component.html` bildet das HTML-Gerüst. Während `root.components.ts` das ausgewählte Theme steuert, ob der Nutzer lieber im Dark- oder im Light-Mode arbeitet. Damit das Theme nicht nach jedem Neuladen wieder eingestellt werden muss, speichern wir die dazugehörige Variable im Cache des Browsern mit der [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).

### /settings
Die Settings-Komponente beinhaltet die Darstellung des Settings-Side-Menu. Zwei Funktionen aus anderen Services werden hier getriggert: 
* settingsService.triggerBoardName(): Der Name des Board's wird im `settings.service.ts` verarbeitet und über den Server emitet.
* rootComponent.changeTheme(): Ruft die Web Storage API in `root.components.ts` auf
 
### /toolbar
Die Toolbar befindet sich am linken Rand. Auf Knopfdruck können dort neue Module in das Whiteboard eingefügt werden. Ein Knopfdruck führt die zugehörige Funktion in _/services/canvasmodule/chat.canvasmodule.ts_ aus.

### /zoom-bar
In der Zoombar befinden sich die Funktionalitäten für die Canvas-Größe und das rein und raus-zoomen mit einem Slider.
Die Canvas-Größe wird in einem [Dialog-Fenster](https://material.angular.io/components/dialog/overview) eingestellt. Das `settings-dialog.html` wird durch eine zweite Klasse `DialogHTML` bereit gestellt. Falls eine Änderung passiert wird eine Änderung in `settings.service.ts` gemacht.

Der Slider verändert eine Variable, auch in `settings.service.ts`. Diese Variable nimmt Einfluss auf ein `transform: scale(zoomValue)` in der `canvas.components.html`. Dadurch wird der ganze Canvas vergrößert und verkleinert, samt der ganzen Module.   
Ein Problem entsteht dabei: Die Darstellung verändert sich, aber technisch ist immer noch alles gleich. Das führt dazu, dass beim Verschieben eines Elementes die _boundary_ immer noch dieselbe ist und sich das Modul deshalb falsch verhält.
Dieser Fehler tritt bei den CSS-Styles `transform` und `zoom` gleichermaßen auf, wobei `zoom` von Firefox nicht unterstützt wird und wir deshalb auf `transform` gesetzt haben.
 
## /interfaces
[Interfaces in TypeScript](https://www.typescriptlang.org/docs/handbook/interfaces.html) definieren selbst-erstellte Typen. Mit diesen Typen können wir sichergehen, dass Module und Chatnachrichten den richtigen Objekt-Aufbau haben und somit korrekt verarbeitet werden können.

### CanvasModule
```
export interface CanvasModule {
  _id: string,
  type: string,
  position: {
    x: number,
    y: number,
    width: number,
    height: number
  },
  content: any
}
```
Auch wenn wir eine NoSQL-Datenbank haben brauchen wir eine gewisse Struktur in unseren Modulen, um sie alle gleichermaßen in der `canvas.component.html` verarbeiten zu können. Wichtig zu erwähnen ist, dass wir den content auf any gestellt haben, um flexibel die Inhalte unserer Module integrieren zu können. So wird bei Text-Modulen ein String eingefügt und bei der To-Do-Liste ein Array mit einzelnen Items.

### ChatMsg
```
export interface ChatMsg {
  _id: string,
  message: string
}
```

### Settings
```
export interface Settings {
  canvasWidth: number;
  canvasHeight: number;
  boardName: string;
  _id: string
}
```

## /services
Services in Angular ist ausgelagerte Code. Aus gleichen Gründen, die auch für Komponenten sprechen, haben wir essenzielle Funktionen in Services gebündelt.

### /canvasmodule
In der Variable `moduleArray` werden alle Module abgelegt. Diese werden dann mit einer ngFor-Schleife sofort ausgegeben.

Funktionen in diesem Service:

**updateLastTextEmit():** Wenn nach jeder Zeicheneingabe der gesamte Inhalt des Text-Elements übermittelt wird, kommt es zu starken rucklern. Das System überlastet, bei zu vielen Emits. Deshalb gibt es eine "Sperre" bei Text-Modulen. Es wird alle 500ms übermittelt. Dafür sorgt ein Counter, der eine Variable alle 1ms um Eins erhöht. Diese Funktion übernimmt das Hochzählen der Variable. 

**moduleCreate():** Diese Funktion wird in der `toolbar.component.html` aufgerufen. Je nach Knopfdruck wird der _type_ und _content_ festgelegt und an diese Funktion übergeben. Diese wird an den Server emitet und schließlich in der Datenbank gespeichert und an alle ausgegeben.

**moduleArrayPush():** Fügt neue Module in die Array ein, die über `socket.on` in der `canvas.components.ts` an die Clients geschickt wurden.

**moduleEdit():** Wird aufgerufen, wenn ein Client eine Änderung an einem Modul vollzieht. Das Modul wird in `moduleArrayEdit()` manipuliert. Zusätzlich werden abgehackte to-dos an das Listenende gesetzt und es findet die zeitliche Überprüfung bei text-Modulen statt. Danach wird das Modul emitet.

### /chat
In der Variable `chatRecord` werden alle Chatnachrichten als Objekte des Types `ChatMsg` abgelegt.

In diesem Service werden die Chat-Nachrichten verwaltet. Entweder zum `chatRecord` hinzugefügt oder gelöscht.

### /file-upload
Der Auswahlprozess für das Bild, welches hochgeladen werden soll findet in der `toolbar.components.html`, mit einem `<input type="file">` statt. Nach Auswahl wird `onfileChange()` getriggert. Das Bild wird verarbeitet, auf dem Server hochgeladen und dann emitet.    
Aktuell werden nur Bilddateien unterstützt. Die Sortierung findet serverseitig statt.

### /settings
In diesem Service werden alle Einstellungen gespeichert, die für jeden Client und jede Komponente nützlich ist: Die Größe des Boards, der Boardname und auch der Zoom-Faktor.   
Zu jeder dieser Werte gibt es verschiedene Getter und Setter.

### /todo
Dieser Service beinhaltet alle Funktionen, um die einzelnen To-Do-Listen bearbeiten zu können. Funktionen um Elemente zu erstellen, editieren, löschen und abzuhacken.

# /dist
Die Angular-Anwendung wird nach dem build-Prozess in diesem Ordner gespeichert. Die ganze frontend-Anwendung wird dann vom node.js-Server an alle Clients ausgespielt.

# /server
In diesem Ordner befinden sich alle serverbasierten Dateien. Dieser Ordner ist der node.js-Server.   
Socket.io benutzt in den Tutorials das Framework [Express](https://expressjs.com/), um schnell und einfach einen node.js-Server aufzusetzen. Deshalb haben wir dieses Framework mit übernommen.

Interessant an einem node-Server ist, dass JavaScript sowohl im Front- als auch im Backend verwendet wird. Deshalb bleibt die Art und Weise der Programmierung gleich. Wir beispielsweise können ein `console.log()` verwenden, alle socket-funktionen und POST-Requests gleich aufbauen.

## /index.js
### Serverstart
```
//Starte den Server und verteile eine statische Webseite, die sich im Ordner [/dist](#dist) befindet.
  app.use(express.static('../dist/'));
 
//Stehe im localhost unter dem Port 3000 zur Verfügung.
  http.listen(3000, () => {
      console.log('listening on *:3000');
  });
```

### Datenbank
Zu Beginn haben wir drei verschiedene Datenbank-Arten ausprobiert:
* [NeDB](https://github.com/louischatriot/nedb/)
* [MongoDB](https://www.mongodb.com/)
* [ShareDB](https://github.com/share/sharedb#features)   
Wir haben uns für NeDB entscheiden. Diese Datenbank ist vom Funktionsumfang und der Einfachheit ideal für uns. Auch in Hinblick auf das Hosting. NeDB erstellt für jede Datenbank eine .db-Datei die im Server-Ordner liegt.
```
//Erstelle zwei Datenbanken. Falls die Datei nicht vorhanden ist, erstelle eine.
const db = new Database({filename: 'database.db', timestampData: true});
const chatdb = new Database({filename: 'chat.db', timestampData: true});
const preferencesdb = new Database({filename: 'preferencesdb.db'});

//Mache beide Datenbanken betriebsbereit.
db.loadDatabase();
chatdb.loadDatabase();
preferencesdb.loadDatabase();
```
Wir benutzen drei Datenbanken:
`db` ist für alle Module, `chatdb` für alle Chatnachrichten und `preferencesdb` für die Einstellungen.

### Serverseitiges Socket
Die serverseitigen Funktionen von Socket sind gleich aufgebaut, wie auch im Frontend.   
`io.on('connection', (socket) => { socket.on() }`

Erst wird socket initialisiert. Innerhalb der Callback-Funktion werden die Empfangskanäle konfiguriert. Für jedes clientseitige `socket.emit()` muss es ein serverseitiges `socket.on()` geben. Alle Datenbank-Manipulationen für Module und Chatnachrichten werden in diesem Code-Abschnitt bearbeitet.

Wir benutzen die `_id` der Datenbank-Objekte um jedes Modul identifizieren zu können. Die Datenbank-Funktionen (insert, delete, update) bieten einen Callback, um das verarbeitete Objekt aus der Datenbank gleich weiter verarbeiten zu können. Nach der Datenbank-Verarbeitung nutzen schicken wir die Objekte an alle Clients. Beispiel:   
```
//Ein Client hat eine Nachricht abgeschickt.
socket.on('new chat message', (obj) => {
        chatdb.insert({
            //Lege die Objekt-Struktur hier fest.            
            _id: obj._id,
            message: obj.message
        }, (err, newDoc) => {
            //callback mit dem neuen Objekt
            //Logge das neue Objekt und sende es dann mit io.emit() an alle Clients.
            console.log('new object: ' + JSON.stringify(newDoc));
            io.emit('new chat message', newDoc);
        });
    });
```

### file upload
Der POST-Request wird in der `file-upload.service.ts` ausgelöst. Es wird überprüft, ob wirklich eine Datei hochgeladen wurde und ob die Datei eine erlaube Dateiendung hat. Danach wird sie im Ordner _/uploads_ abgelegt.

## /uploads
In diesem Ordner werden alle Bild-Dateien abgelegt, die in das Whiteboard hochgeladen wurden.