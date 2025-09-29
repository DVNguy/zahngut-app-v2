// data.js - Zahngut Bad Wünnenberg App Datenverwaltung
// Version mit Ihren angepassten Daten

const ZahngutData = {
    // Ihre exportierten und korrigierten Daten
    defaultData: {
        "praxis": {
            "name": "Zahngut Bad Wünnenberg",
            "slogan": "Moderne Zahnmedizin. Der Mensch im Mittelpunkt.",
            "telefon": "02957/1010",
            "notdienst": "01805/986700",
            "email": "info@dein-zahngut.de",
            "adresse": "Hauptstraße 1",
            "plz": "33181",
            "ort": "Bad Wünnenberg",
            "doctolib": "https://www.doctolib.de/zahnarztpraxis/bad-wuennenberg/zahngut-bad-wuennenberg",
            "address": {
                "street": "Hauptstraße 1",
                "zip": "33181",
                "city": "Bad Wünnenberg"
            }
        },
        "oeffnungszeiten": {
            "montag": {"von": "08:00", "bis": "19:00"},
            "dienstag": {"von": "08:00", "bis": "19:00"},
            "mittwoch": {"von": "08:00", "bis": "19:00"},
            "donnerstag": {"von": "08:00", "bis": "19:00"},
            "freitag": {"von": "08:00", "bis": "16:00"},
            "samstag": {"von": "", "bis": ""},
            "sonntag": {"von": "", "bis": ""}
        },
        "treatments": [
            {
                "id": "prophylaxe",
                "category": "zahnerhaltung",
                "name": "Prophylaxe",
                "icon": "🦷",
                "iconType": "emoji",
                "untertitel": "Professionelle Zahnreinigung",
                "was": "Die professionelle Zahnreinigung (PZR) ist eine intensive Reinigung der Zähne, die weit über das normale Zähneputzen hinausgeht.",
                "ablauf": [
                    "Gründliche Untersuchung der Mundhöhle",
                    "Entfernung von Zahnstein und Belägen",
                    "Reinigung der Zahnzwischenräume",
                    "Politur der Zahnoberflächen",
                    "Fluoridierung zum Schutz",
                    "Individuelle Pflegetipps"
                ],
                "vorteile": [
                    "Vorbeugung von Karies und Parodontose",
                    "Frischer Atem und sauberes Mundgefühl",
                    "Hellere, glatte Zähne",
                    "Längere Haltbarkeit von Füllungen",
                    "Früherkennung von Zahnproblemen"
                ],
                "dauer": "45-60 Min",
                "empfohlen": "2x jährlich",
                "active": true
            },
            {
                "id": "fuellungen",
                "category": "zahnerhaltung",
                "name": "Füllungen",
                "icon": "🔨",
                "iconType": "emoji",
                "untertitel": "Moderne Füllungstherapie",
                "was": "Hochwertige zahnfarbene Füllungen zur Wiederherstellung der Zahnsubstanz nach Kariesbefall.",
                "ablauf": [
                    "Betäubung des betroffenen Bereichs",
                    "Entfernung der Karies",
                    "Desinfektion der Kavität",
                    "Schichtweiser Aufbau der Füllung",
                    "Ausarbeitung und Politur"
                ],
                "vorteile": [
                    "Zahnfarbene, unsichtbare Restauration",
                    "Langlebige Materialien",
                    "Minimalinvasive Behandlung",
                    "Sofortige Belastbarkeit"
                ],
                "dauer": "30-45 Min",
                "empfohlen": "Bei Bedarf",
                "active": true
            },
            {
                "id": "wurzelbehandlung",
                "category": "zahnerhaltung",
                "name": "Wurzelbehandlung",
                "icon": "💉",
                "iconType": "emoji",
                "untertitel": "Endodontie mit modernster Technik",
                "was": "Behandlung des entzündeten Zahnnervs zur Erhaltung des natürlichen Zahns.",
                "ablauf": [
                    "Röntgenaufnahme zur Diagnose",
                    "Lokale Betäubung",
                    "Eröffnung des Zahns",
                    "Entfernung des entzündeten Gewebes",
                    "Desinfektion und Aufbereitung",
                    "Wurzelfüllung",
                    "Verschluss mit Füllung oder Krone"
                ],
                "vorteile": [
                    "Erhalt des natürlichen Zahns",
                    "Schmerzfreiheit",
                    "Vermeidung von Zahnersatz",
                    "Moderne maschinelle Aufbereitung"
                ],
                "dauer": "60-90 Min",
                "empfohlen": "Bei Bedarf",
                "active": true
            },
            {
                "id": "kronen",
                "category": "zahnersatz",
                "name": "Kronen",
                "icon": "👑",
                "iconType": "emoji",
                "untertitel": "Vollkeramikkronen",
                "was": "Hochwertige Überkronung stark geschädigter Zähne mit biokompatiblen Materialien.",
                "ablauf": [
                    "Präparation des Zahns",
                    "Digitaler Scan oder Abdruck",
                    "Provisorische Versorgung",
                    "Herstellung im Labor",
                    "Einprobe und Anpassung",
                    "Definitive Befestigung"
                ],
                "vorteile": [
                    "Natürliche Ästhetik",
                    "Lange Haltbarkeit",
                    "Biokompatible Materialien",
                    "Stabilisierung des Zahns"
                ],
                "dauer": "2-3 Termine",
                "empfohlen": "Nach Wurzelbehandlung",
                "active": true
            },
            {
                "id": "bruecken",
                "category": "zahnersatz",
                "name": "Brücken",
                "icon": "🌉",
                "iconType": "emoji",
                "untertitel": "Festsitzender Zahnersatz",
                "was": "Lückenschluss durch festsitzenden Zahnersatz, der an den Nachbarzähnen verankert wird.",
                "ablauf": [
                    "Präparation der Pfeilerzähne",
                    "Abformung oder Scan",
                    "Provisorium",
                    "Anprobe des Gerüsts",
                    "Fertigstellung im Labor",
                    "Eingliederung und Zementierung"
                ],
                "vorteile": [
                    "Festsitzende Lösung",
                    "Natürliches Kaugefühl",
                    "Keine Herausnahme nötig",
                    "Bewährte Versorgung"
                ],
                "dauer": "3-4 Termine",
                "empfohlen": "Bei Zahnlücken",
                "active": true
            },
            {
                "id": "weisheitszahn",
                "category": "chirurgie",
                "name": "Weisheitszahn-OP",
                "icon": "🦷",
                "iconType": "emoji",
                "untertitel": "Schonende Entfernung",
                "was": "Operative Entfernung von Weisheitszähnen bei Platzmangel oder Entzündungen.",
                "ablauf": [
                    "Röntgendiagnostik",
                    "Lokale Betäubung",
                    "Freilegung des Zahns",
                    "Schonende Entfernung",
                    "Wundreinigung",
                    "Nahtversorgung"
                ],
                "vorteile": [
                    "Vermeidung von Komplikationen",
                    "Schmerzfreiheit",
                    "Minimalinvasive Technik",
                    "Erfahrene Operateure"
                ],
                "dauer": "30-60 Min",
                "empfohlen": "Bei Beschwerden",
                "active": true
            },
            {
                "id": "implantate",
                "category": "implantologie",
                "name": "Zahnimplantate",
                "icon": "🔩",
                "iconType": "emoji",
                "untertitel": "Künstliche Zahnwurzeln",
                "was": "Ersatz fehlender Zähne durch Titanimplantate als künstliche Zahnwurzeln.",
                "ablauf": [
                    "3D-Diagnostik und Planung",
                    "Implantation unter Lokalanästhesie",
                    "Einheilphase (3-6 Monate)",
                    "Freilegung des Implantats",
                    "Abformung für die Krone",
                    "Eingliederung der Implantatkrone"
                ],
                "vorteile": [
                    "Fester Halt wie eigene Zähne",
                    "Kein Beschleifen der Nachbarzähne",
                    "Erhalt des Kieferknochens",
                    "Natürliche Ästhetik und Funktion"
                ],
                "dauer": "3-6 Monate gesamt",
                "empfohlen": "Bei Zahnverlust",
                "active": true
            }
        ],
        "videos": [
            {
                "id": 1758703135744,
                "title": "Wurzelkanalbehandlung unter OP-Mikroskop",
                "category": "allgemein",
                "duration": "3:30",
                "views": "4838k",
                "url": "https://youtu.be/nPKHp72Suc8",
                "thumbnail": "",
                "active": true
            }
        ],
        "aftercare": [
            {
                "id": 1,
                "behandlung": "Zahnextraktion",
                "kurzbeschreibung": "Nach dem Ziehen eines Zahnes",
                "zeitraum": "7-10 Tage",
                "icon": "🦷",
                "phasen": {
                    "phase1": {
                        "title": "Direkt nach dem Eingriff",
                        "time": "0-2h",
                        "items": [
                            "30 Min fest auf Tupfer beißen",
                            "Nicht ausspülen oder spucken",
                            "Kopf hochlagern",
                            "Von außen kühlen (20 Min Intervalle)"
                        ]
                    },
                    "phase2": {
                        "title": "Erste 24 Stunden",
                        "time": "Tag 1",
                        "items": [
                            "Keine heißen Getränke oder Speisen",
                            "Nicht rauchen (mind. 48h)",
                            "Kein Alkohol",
                            "Kein Sport oder schwere Arbeit",
                            "Weiche, lauwarme Kost"
                        ]
                    },
                    "phase3": {
                        "title": "Heilungsphase",
                        "time": "Tag 2-7",
                        "items": [
                            "Vorsichtige Mundhygiene",
                            "Wundbereich aussparen",
                            "Chlorhexidin-Spülung 2x täglich",
                            "Bei Schmerzen: Ibuprofen 400-600mg",
                            "Kontrolltermin wahrnehmen"
                        ]
                    }
                },
                "warnung": "Starke Blutungen, pochende Schmerzen nach 3 Tagen, Fieber über 38°C, starke Schwellung",
                "active": true
            },
            {
                "id": 2,
                "behandlung": "Implantation",
                "kurzbeschreibung": "Nach dem Einsetzen eines Implantats",
                "zeitraum": "3-6 Monate",
                "icon": "🔩",
                "phasen": {
                    "phase1": {
                        "title": "OP-Tag",
                        "time": "Tag 0",
                        "items": [
                            "Kontinuierliche Kühlung",
                            "Schmerzmittel nach Plan",
                            "Antibiotika wie verordnet",
                            "Nur flüssige/breiige Kost",
                            "Nicht auf OP-Seite kauen"
                        ]
                    },
                    "phase2": {
                        "title": "Erste Woche",
                        "time": "Tag 1-7",
                        "items": [
                            "Wundgebiet nicht belasten",
                            "Sehr vorsichtige Mundhygiene",
                            "Chlorhexidin-Gel auf Wunde",
                            "Weiche Kost fortsetzen",
                            "Nahtentfernung nach 7-10 Tagen"
                        ]
                    },
                    "phase3": {
                        "title": "Einheilphase",
                        "time": "Woche 2-24",
                        "items": [
                            "Regelmäßige Kontrollen",
                            "Normale Mundhygiene",
                            "Provisorium pflegen",
                            "Belastung langsam steigern",
                            "Röntgenkontrolle nach 3 Monaten"
                        ]
                    }
                },
                "warnung": "Lockerung des Implantats, starke Schmerzen, Eiterbildung, Fieber, Taubheitsgefühl",
                "active": true
            },
            {
                "id": 3,
                "behandlung": "Wurzelbehandlung",
                "kurzbeschreibung": "Nach einer Wurzelkanalbehandlung",
                "zeitraum": "3-7 Tage",
                "icon": "💉",
                "phasen": {
                    "phase1": {
                        "title": "Erste Stunden",
                        "time": "0-4h",
                        "items": [
                            "Nichts essen bis Betäubung abgeklungen",
                            "Vorsicht vor Bissverletzungen",
                            "Bei Bedarf Schmerzmittel",
                            "Behandelten Zahn schonen"
                        ]
                    },
                    "phase2": {
                        "title": "Erste Tage",
                        "time": "Tag 1-3",
                        "items": [
                            "Aufbissschmerzen sind normal",
                            "Weiche Kost bevorzugen",
                            "Normale Mundhygiene",
                            "Ibuprofen bei Schmerzen",
                            "Provisorium nicht überbelasten"
                        ]
                    },
                    "phase3": {
                        "title": "Heilungsphase",
                        "time": "Tag 4-7",
                        "items": [
                            "Beschwerden sollten abklingen",
                            "Normale Belastung möglich",
                            "Termin für definitive Versorgung",
                            "Bei anhaltenden Schmerzen: Kontrolle"
                        ]
                    }
                },
                "warnung": "Starke pochende Schmerzen, Schwellung, Fistelbildung, lockeres Provisorium",
                "active": true
            },
            {
                "id": 4,
                "behandlung": "Parodontose-Behandlung",
                "kurzbeschreibung": "Nach der Zahnfleischbehandlung",
                "zeitraum": "2-4 Wochen",
                "icon": "🩹",
                "phasen": {
                    "phase1": {
                        "title": "Behandlungstag",
                        "time": "Tag 0",
                        "items": [
                            "Keine Mundspülung für 24h",
                            "Weiche Zahnbürste verwenden",
                            "Vorsichtig putzen",
                            "Bei Schmerzen kühlen",
                            "Rauchen vermeiden"
                        ]
                    },
                    "phase2": {
                        "title": "Erste Woche",
                        "time": "Tag 1-7",
                        "items": [
                            "Chlorhexidin-Spülung 2x täglich",
                            "Zahnzwischenräume vorsichtig reinigen",
                            "Weiche Kost bei Empfindlichkeit",
                            "Zahnfleischbluten kann auftreten"
                        ]
                    },
                    "phase3": {
                        "title": "Heilung",
                        "time": "Woche 2-4",
                        "items": [
                            "Normale Mundhygiene intensivieren",
                            "Interdentalbürsten verwenden",
                            "Kontrolltermin wahrnehmen",
                            "Professionelle Nachsorge wichtig"
                        ]
                    }
                },
                "warnung": "Starke Blutungen, zunehmende Schmerzen, Eiterbildung, Fieber",
                "active": true
            },
            {
                "id": 5,
                "behandlung": "Weisheitszahn-OP",
                "kurzbeschreibung": "Nach der Weisheitszahnentfernung",
                "zeitraum": "10-14 Tage",
                "icon": "🏥",
                "phasen": {
                    "phase1": {
                        "title": "OP-Tag",
                        "time": "0-6h",
                        "items": [
                            "1 Stunde auf Tupfer beißen",
                            "Dauerkühlung von außen",
                            "Kopf hochlagern (auch nachts)",
                            "Nur Wasser trinken",
                            "Absolute Ruhe"
                        ]
                    },
                    "phase2": {
                        "title": "Tag 1-3",
                        "time": "Tag 1-3",
                        "items": [
                            "Weiterhin kühlen",
                            "Flüssig-breiige Kost",
                            "Nicht spülen, nur auslaufen lassen",
                            "Antibiotika/Schmerzmittel nach Plan",
                            "Schwellung ist normal"
                        ]
                    },
                    "phase3": {
                        "title": "Tag 4-14",
                        "time": "Tag 4-14",
                        "items": [
                            "Vorsichtige Mundspülungen",
                            "Langsam normale Kost",
                            "Wundränder sauber halten",
                            "Nahtentfernung Tag 7-10",
                            "Sport nach 1 Woche möglich"
                        ]
                    }
                },
                "warnung": "Nachblutung, Schluckbeschwerden, Kieferklemme, Taubheit nach 24h, hohes Fieber",
                "active": true
            },
            {
                "id": 6,
                "behandlung": "Knochenaufbau",
                "kurzbeschreibung": "Nach Augmentation",
                "zeitraum": "4-6 Monate",
                "icon": "🦴",
                "phasen": {
                    "phase1": {
                        "title": "Erste 48 Stunden",
                        "time": "0-48h",
                        "items": [
                            "Absolute Schonung",
                            "Nicht schnäuzen (4 Wochen!)",
                            "Oberkörper hochlagern",
                            "Eiskalte Getränke meiden",
                            "Antibiotika konsequent nehmen"
                        ]
                    },
                    "phase2": {
                        "title": "Erste 2 Wochen",
                        "time": "Woche 1-2",
                        "items": [
                            "Sehr weiche Kost",
                            "Keine körperliche Anstrengung",
                            "Mundspülung nach Anweisung",
                            "Provisorium nicht belasten",
                            "Wöchentliche Kontrolle"
                        ]
                    },
                    "phase3": {
                        "title": "Einheilung",
                        "time": "Monat 1-6",
                        "items": [
                            "Langsame Belastungssteigerung",
                            "Regelmäßige Röntgenkontrollen",
                            "Gute Mundhygiene wichtig",
                            "Rauchen unbedingt vermeiden",
                            "Geduld bis zur vollständigen Heilung"
                        ]
                    }
                },
                "warnung": "Starke Schwellung, Nasenbluten, Bewegung des Augmentats, anhaltende Taubheit",
                "active": true
            },
            {
                "id": 7,
                "behandlung": "Bleaching",
                "kurzbeschreibung": "Nach der Zahnaufhellung",
                "zeitraum": "48 Stunden",
                "icon": "✨",
                "phasen": {
                    "phase1": {
                        "title": "Erste 24 Stunden",
                        "time": "0-24h",
                        "items": [
                            "Keine färbenden Lebensmittel",
                            "Kein Kaffee, Tee, Rotwein",
                            "Nicht rauchen",
                            "Keine säurehaltigen Getränke",
                            "Bei Empfindlichkeit: Fluorid-Gel"
                        ]
                    },
                    "phase2": {
                        "title": "Tag 2",
                        "time": "24-48h",
                        "items": [
                            "Weiterhin weiße Diät",
                            "Sensitivzahnpasta verwenden",
                            "Vorsichtig putzen",
                            "Temperaturextreme meiden"
                        ]
                    },
                    "phase3": {
                        "title": "Ab Tag 3",
                        "time": "Ab Tag 3",
                        "items": [
                            "Normale Ernährung möglich",
                            "Gute Mundhygiene für Erhalt",
                            "Regelmäßige Prophylaxe",
                            "Auffrischung nach 6-12 Monaten möglich"
                        ]
                    }
                },
                "warnung": "Extreme Überempfindlichkeit, Zahnfleischreizungen",
                "active": true
            },
            {
                "id": 8,
                "behandlung": "Kronen/Brücken",
                "kurzbeschreibung": "Nach dem Einsetzen",
                "zeitraum": "1 Woche",
                "icon": "👑",
                "phasen": {
                    "phase1": {
                        "title": "Erste Stunden",
                        "time": "0-4h",
                        "items": [
                            "Warten bis Betäubung abgeklungen",
                            "Vorsichtig auf Biss achten",
                            "Keine harten Speisen",
                            "Provisorium: besonders vorsichtig"
                        ]
                    },
                    "phase2": {
                        "title": "Erste Tage",
                        "time": "Tag 1-3",
                        "items": [
                            "Empfindlichkeit ist normal",
                            "Zahnseide vorsichtig verwenden",
                            "Keine klebrigen Speisen",
                            "Bei Störgefühl: Kontrolle"
                        ]
                    },
                    "phase3": {
                        "title": "Eingewöhnung",
                        "time": "Tag 4-7",
                        "items": [
                            "Normale Belastung möglich",
                            "Gründliche Reinigung wichtig",
                            "Interdentalbürsten verwenden",
                            "Kontrolltermin vereinbaren"
                        ]
                    }
                },
                "warnung": "Dauerschmerz, Lockerung, Bisserhöhung, Zahnfleischentzündung",
                "active": true
            }
        ],
        "design": {
            "colors": {
                "primary": "#0891b2",
                "primaryDark": "#005e7f",
                "accent": "#06b6d4",
                "secondary": "#3bc4e5",
                "success": "#10B981",
                "warning": "#F59E0B",
                "error": "#EF4444",
                "textDark": "#0F172A",
                "textLight": "#64748B",
                "bgLight": "#F8FAFC",
                "white": "#FFFFFF"
            },
            "logoType": "icon",
            "logoIcon": "🦷",
            "customLogo": null,
            "customIcon": null
        },
        "emergency": {
            "nummer": "01805 / 986 700",
            "zeiten": "Außerhalb der Öffnungszeiten",
            "anweisungen": [
                "Kühlen Sie die betroffene Stelle von außen",
                "Spülen Sie mit lauwarmem Salzwasser",
                "Nehmen Sie bei Bedarf Schmerzmittel (Ibuprofen)",
                "Vermeiden Sie Wärme und körperliche Anstrengung"
            ],
            "zahnAus": "Zahn nur an der Krone anfassen, in H-Milch oder Kochsalzlösung legen, sofort zum Zahnarzt!",
            "zahnLocker": "Nicht bewegen, weiche Kost, schnellstmöglich zum Zahnarzt"
        }
    },

    // Funktionen für Datenverwaltung
    load() {
        try {
            const stored = localStorage.getItem('zahngutAppData');
            if (stored) {
                const parsed = JSON.parse(stored);
                return this.mergeDeep(this.defaultData, parsed);
            }
            return this.defaultData;
        } catch (error) {
            console.error('Fehler beim Laden der Daten:', error);
            return this.defaultData;
        }
    },

    save(data) {
        try {
            localStorage.setItem('zahngutAppData', JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Fehler beim Speichern:', error);
            return false;
        }
    },

    applyDesign() {
        const data = this.load();
        if (!data || !data.design || !data.design.colors) {
            console.log('Keine Design-Einstellungen gefunden, verwende Standards');
            return;
        }
        
        const root = document.documentElement;
        const colors = data.design.colors;
        
        // Setze CSS-Variablen für das Türkis-Design
        root.style.setProperty('--primary', colors.primary);
        root.style.setProperty('--primary-dark', colors.primaryDark);
        root.style.setProperty('--accent', colors.accent);
        root.style.setProperty('--secondary', colors.secondary);
        root.style.setProperty('--text-dark', colors.textDark);
        root.style.setProperty('--text-light', colors.textLight);
        root.style.setProperty('--bg-light', colors.bgLight);
        root.style.setProperty('--gradient', `linear-gradient(135deg, ${colors.primary} 0%, ${colors.accent} 100%)`);
        
        console.log('Design erfolgreich angewendet: Türkis-Theme');
        return data.design;
    },

    mergeDeep(target, source) {
        const output = Object.assign({}, target);
        if (this.isObject(target) && this.isObject(source)) {
            Object.keys(source).forEach(key => {
                if (this.isObject(source[key])) {
                    if (!(key in target))
                        Object.assign(output, { [key]: source[key] });
                    else
                        output[key] = this.mergeDeep(target[key], source[key]);
                } else {
                    Object.assign(output, { [key]: source[key] });
                }
            });
        }
        return output;
    },

    isObject(item) {
        return item && typeof item === 'object' && !Array.isArray(item);
    },

    renderNachsorge(container) {
        const data = this.load();
        const nachsorgeItems = data.aftercare.filter(n => n.active !== false);
        
        if (!container) return;
        
        container.innerHTML = nachsorgeItems.map(item => {
            // Handle custom icons
            const iconDisplay = item.iconType === 'custom' && item.customIcon 
                ? `<img src="${item.customIcon}" style="width: 100%; height: 100%; object-fit: contain;">` 
                : item.icon;
                
            return `
            <div class="nachsorge-card" onclick="toggleNachsorge(this)">
                <div class="nachsorge-header">
                    <div class="nachsorge-icon">${iconDisplay}</div>
                    <div class="nachsorge-info">
                        <h3>${item.behandlung}</h3>
                        <p>${item.kurzbeschreibung}</p>
                    </div>
                    <div class="expand-icon">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                            <path d="M6 9l6 6 6-6" stroke="var(--text-light)" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </div>
                </div>
                <div class="nachsorge-content">
                    <div class="timeline">
                        ${Object.values(item.phasen).map(phase => `
                            <div class="timeline-item">
                                <div class="timeline-badge" data-time="${phase.time}"></div>
                                <div class="timeline-content">
                                    <h4>${phase.title}</h4>
                                    <ul>
                                        ${phase.items.map(i => `<li>${i}</li>`).join('')}
                                    </ul>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                    ${item.warnung ? `
                        <div class="warning-box">
                            <strong>⚠️ Sofort melden bei:</strong> ${item.warnung}
                        </div>
                    ` : ''}
                </div>
            </div>
        `}).join('');
    }
};

// Export für Module
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ZahngutData;
}

// Auto-Initialize wenn DOM bereit
if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('ZahngutData initialisiert mit Ihren angepassten Daten');
        console.log('Türkis-Design aktiv, YouTube-Video verfügbar');
        if (window.location.pathname.includes('index.html')) {
            ZahngutData.applyDesign();
        }
    });
}
