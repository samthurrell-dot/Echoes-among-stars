// ============================================================================
//  ECHOES AMONG THE STARS — Game Data v2
//  All narrative content, characters, locations, clues, and events.
// ============================================================================

const GAME_DATA = {

  config: {
    title: "Echoes Among the Stars",
    subtitle: "A Detective Visual Novel",
    startScene: "arrival",
    actionsPerDay: 3,
    imagePath: "assets/images/",
    initialState: {
      day: 0, mode: "vn", actionsRemaining: 0,
      trust: { lawson:50, shaw:30, liu:60, emily:70, max:55, vega:45, das:65, clara:70, pierce:40, marquez:45 },
      suspicion: { lawson:20, shaw:35, liu:15, pierce:25, marquez:22 },
      shawGuilt: 80, energy: 90, insight: 70, authority: 60,
      clues: [], journal: [], inventory: [], flags: {},
      visitedToday: [], reportedClues: [], dayClues: [], inScene: false
    }
  },

  characters: {
    amelia:  { name:"Amelia Drake",        role:"Station Detective",           color:"#5ee898", portraits:{ default:"Amelia_serious.png", neutral:"Amelia neutral wonder.png", sad:"Amelia sad.png" }},
    lawson:  { name:"Captain Lawson",      role:"Commanding Officer",          color:"#ffd36c", portraits:{ default:"Sarah.png" }},
    shaw:    { name:"Daniel Shaw",         role:"Security Chief",              color:"#ff8a5c", portraits:{ default:"Daniel.png" }},
    liu:     { name:"Dr. Elizabeth Liu",   role:"Astrobiologist",              color:"#85b7eb", portraits:{ default:"Elizabeth.png" }},
    emily:   { name:"Emily Anderson",      role:"Communications Specialist",   color:"#ed93b1", portraits:{ default:"Emily.png" }},
    max:     { name:"Max Rodriguez",       role:"Junior Engineer",             color:"#97c459", portraits:{ default:"Max.png" }},
    vega:    { name:"Marcus Vega",         role:"Maintenance Supervisor",      color:"#b4b2a9", portraits:{ default:"Marcus.png" }},
    das:     { name:"Dr. Vikram Das",      role:"Horticulturist",              color:"#5dcaa5", portraits:{ default:"Das.png" }},
    clara:   { name:"Clara Day",           role:"Morale Officer",              color:"#cecbf6", portraits:{ default:"Clara.png" }},
    rourke:  { name:"Dr. Marcus Rourke",   role:"Senior Xenobiologist",        color:"#f09595", portraits:{ default:"Rourke.png" }},
    pierce:  { name:"Dr. Malcolm Pierce",  role:"Junior Lab Assistant",        color:"#b5d4f4", portraits:{ default:"Pierce.png" }},
    marquez: { name:"Dr. Simone Marquez",  role:"Rival Scientist",             color:"#f5c4b3", portraits:{ default:"Marquez.png" }},
    rosie:   { name:"R.O.S.I.E.",          role:"Utility Drone",               color:"#9fe1cb", portraits:{ default:"R.o.s.i.e 1.jpg" }},
    worker:  { name:"Maintenance Worker",  role:"",                            color:"#888780", portraits:{ default:"maintenance_worker.png" }},
    narrator:{ name:"",                    role:"",                            color:"#b3c0da", portraits:{} }
  },

  backgrounds: {
    docking_bay:"docking_bay.jpg", command_center:"command_center.jpg", dining_hall:"dining_hall.jpg",
    hallway:"hallway_meet_cute.jpg", quarters:"quarters.jpg", lab:"lab.jpg", medbay:"medbay.jpg",
    observation:"observation_deck.jpg", hydroponics:"hydroponics.jpg", comms_room:"comms_room.jpg"
  },

  locations: [
    { id:"command_center", name:"Command Center",   bg:"command_center", description:"The nerve centre of Valkyrie-7. Security terminals and personnel files." },
    { id:"lab",            name:"Research Lab",      bg:"lab",            description:"Rourke's primary workspace. The crime scene." },
    { id:"comms_room",     name:"Comms Room",        bg:"comms_room",     description:"Emily's domain. Communications array and signal monitoring." },
    { id:"dining_hall",    name:"Dining Hall",       bg:"dining_hall",    description:"Where the crew gathers. Good for casual conversation." },
    { id:"medbay",         name:"Medical Bay",       bg:"medbay",         description:"Dr. Liu's secondary workspace. Autopsy facilities." },
    { id:"docking_bay",    name:"Docking Bay",       bg:"docking_bay",    description:"Cargo processing and maintenance access." },
    { id:"quarters",       name:"Crew Quarters",     bg:"quarters",       description:"Residential corridors. Private conversations." },
    { id:"hydroponics",    name:"Hydroponics Bay",   bg:"hydroponics",    description:"Das's botanical garden. A quiet place to think." },
    { id:"observation",    name:"Observation Deck",  bg:"observation",    description:"A stunning view of Europa. Where people go to be alone." }
  ],

  // ─── CLUE DEFINITIONS (all 36) ───────────────────────────────────────
  clues: {
    // Layer 1: Surface
    shaw_rourke_rivalry:  { name:"Shaw-Rourke Rivalry",    desc:"Deep personal grudge predating the station, confirmed by multiple crew.",                    category:"Testimony" },
    shaw_badge_log:       { name:"Shaw's Badge Log",       desc:"Shaw's badge pinged near the research lab at 03:12 on murder night.",                        category:"Digital Evidence" },
    first_on_scene:       { name:"First on Scene",         desc:"Shaw found the body during a late patrol. First responder.",                                  category:"Testimony" },
    lab_struggle:         { name:"Lab Struggle Evidence",  desc:"Clear signs of physical altercation: overturned equipment, scattered samples.",               category:"Physical Evidence" },
    combat_training:      { name:"Combat Training Record", desc:"8 years Colonial Marines, Gunnery Sergeant, close-combat specialist.",                        category:"Personnel" },
    shaw_volatility:      { name:"Shaw's Volatility",      desc:"Shaw visibly agitated in recent weeks. Snapping at crew, over-patrolling.",                   category:"Behaviour" },
    autopsy_results:      { name:"Autopsy: Blunt Trauma",  desc:"Death from blunt force consistent with a trained fighter.",                                   category:"Medical" },

    // Layer 2: Doubt
    why_now:              { name:"Why Now?",               desc:"Shaw endured 3 years with Rourke. What changed to push him over the edge?",                  category:"Deduction" },
    comms_restricted:     { name:"Comms Restricted",       desc:"External comms locked to command-only BEFORE the body was found.",                            category:"Digital Evidence" },
    rosie_timestamps:     { name:"ROSIE Timestamps",       desc:"Lawson accessed comms room and lab corridor at unusual hours the night before.",              category:"Digital Evidence" },
    dup_manifest:         { name:"Duplicate Manifest",     desc:"Same crate logged twice, 3 minutes apart. Someone was moving something.",                     category:"Digital Evidence" },
    overheard_whisper:    { name:"Overheard Whisper",      desc:"'If they check the logs, we're burned.' Speakers unseen.",                                   category:"Testimony" },
    pre_murder_change:    { name:"Pre-Murder Change",      desc:"Clara noticed Shaw's agitation started BEFORE the murder, not after.",                        category:"Testimony" },
    lawson_prepared:      { name:"Too Prepared",           desc:"Lawson had lockdown protocol ready within minutes. Suspiciously fast.",                       category:"Deduction" },

    // Layer 3: Conspiracy
    forged_comm:          { name:"Forged Comm Log",        desc:"The 'affair' evidence — timestamps don't match. Fabricated on Lawson's terminal.",            category:"Digital Evidence" },
    lawson_override:      { name:"Override Log",           desc:"Lawson used captain's override on comms at 02:47 — before murder was reported.",              category:"Digital Evidence" },
    lawson_private_logs:  { name:"Lawson's Private Logs",  desc:"Journal entries reveal growing desperation. Rourke was lobbying to replace her.",             category:"Digital Evidence" },
    corporate_pact:       { name:"Corporate Pact",         desc:"Rourke family 'arrangement' — keep Marcus productive or be replaced.",                        category:"Digital Evidence" },
    shaw_testimony:       { name:"Shaw's Testimony",       desc:"Shaw confesses: Lawson showed him 'proof' of Rourke-Izzy affair. The lie that made him snap.",category:"Testimony" },
    affair_debunked:      { name:"Affair Debunked",        desc:"Emily proves definitively: affair messages were created on Lawson's terminal.",               category:"Digital Evidence" },

    // Layer 4: Redemption
    encrypted_signal:     { name:"Encrypted Signal",       desc:"Repeating encrypted signal on decommissioned frequency. Off-station origin.",                 category:"Digital Evidence" },
    signal_decoded:       { name:"Signal Decoded",         desc:"Messages from 'I.C.' to 'Danny' — personal, hopeful, longing.",                              category:"Digital Evidence" },
    izzy_identified:      { name:"Izzy Identified",        desc:"I.C. = Isabelle Cole. Shaw's fiancée is alive.",                                             category:"Deduction" },
    secure_channel:       { name:"Secure Channel",         desc:"Emily established private communication. Shaw can speak to Izzy.",                            category:"Event" },

    // Red Herrings
    pierce_lab_key:       { name:"Pierce's Lab Key",       desc:"Pierce's keycard accessed the lab at 01:30 — 90 minutes before Shaw's badge.",               category:"Digital Evidence" },
    pierce_grudge:        { name:"Pierce's Grudge",        desc:"Pierce overheard saying 'someone should deal with him' about Rourke.",                        category:"Testimony" },
    marquez_corridor:     { name:"Marquez Sighting",       desc:"Marquez seen near lab corridor late on murder night.",                                        category:"Testimony" },
    marquez_forgery:      { name:"Marquez's Forgery",      desc:"Evidence Marquez altered datasets to undermine Rourke's findings.",                           category:"Digital Evidence" },
    liu_complaint:        { name:"Liu's Complaint",        desc:"Formal safety complaint about Rourke's experiments, filed two weeks before.",                 category:"Personnel" },
    pierce_no_alibi:      { name:"Pierce Has No Alibi",    desc:"Door sensor shows no movement 23:00-05:00. Suspiciously still.",                              category:"Digital Evidence" },

    // Misdirection
    contaminated_samples: { name:"Contaminated Samples",   desc:"Lab samples deliberately contaminated. Looks like sabotage.",                                 category:"Physical Evidence" },
    airlock_anomaly:      { name:"Airlock Anomaly",        desc:"Airlock 3 cycled at 04:15 on murder night.",                                                  category:"Digital Evidence" },

    // Noise
    enemies_list:         { name:"Rourke's Enemies List",  desc:"Document on Rourke's terminal listing grievances against 6 crew members.",                   category:"Digital Evidence" },
    catherine_demands:    { name:"Catherine's Demands",    desc:"Rourke family demanding answers. Threats of 'consequences.'",                                 category:"Digital Evidence" },
    gossip_fight:         { name:"Station Gossip",         desc:"Crew whispering about a screaming match between Shaw and Rourke two days prior.",             category:"Testimony" },
    rourke_funding:       { name:"Rourke's Funding Emails",desc:"Rourke lobbying Earth for funding, bypassing Lawson entirely.",                               category:"Digital Evidence" }
  },

  // ─── TRUST ASSESSMENTS (Smart-Folio) ─────────────────────────────────
  trustAssessments: {
    lawson: [
      { min:0,  max:25, text: "Lawson is cold and obstructive. She's watching my every move. But her office might be accessible if she's distracted..." },
      { min:26, max:45, text: "Lawson is professional but impatient. She wants results — her kind of results. I need to be careful what I share." },
      { min:46, max:65, text: "Lawson seems satisfied with my progress. She's cooperative, but I can't shake the feeling she's steering me somewhere specific." },
      { min:66, max:100,text: "Lawson trusts me completely. She's giving me full access and resources. Almost too helpful. Am I seeing what she wants me to see?" }
    ],
    shaw: [
      { min:0,  max:25, text: "Shaw is a wall. Arms crossed, clipped answers. He's hiding something, but pushing harder will only make it worse." },
      { min:26, max:45, text: "Shaw is thawing, slowly. He makes eye contact now. There's grief behind that anger — something more than just a grudge." },
      { min:46, max:60, text: "Shaw is starting to trust me. His jaw unclenches when we talk. I think he wants to tell me something but isn't ready." },
      { min:61, max:100,text: "Shaw has decided to trust me. His hands uncurl, his breathing steadies. Whatever he's carrying, I think he's ready to put it down." }
    ],
    emily: [
      { min:0,  max:40, text: "Emily is friendly but guarded about anything technical. 'Captain's orders' comes up a lot." },
      { min:41, max:55, text: "Emily is warming up. She almost told me something about the comms traffic today, then caught herself." },
      { min:56, max:70, text: "Emily trusts me. She's dropping hints about anomalies she's found. I should follow up — she's sitting on something important." },
      { min:71, max:100,text: "Emily is fully on my side. She's actively investigating alongside me, sharing everything she finds. She's my most valuable ally on this station." }
    ],
    liu: [
      { min:0,  max:40, text: "Liu is polite but keeps to the science. She won't discuss anything beyond her professional observations." },
      { min:41, max:60, text: "Liu respects my approach. She's offered useful medical insights. I think she has ethical concerns about what happened here." },
      { min:61, max:100,text: "Liu is a trusted colleague. She speaks freely about Rourke's recklessness and would testify if needed." }
    ],
    max: [
      { min:0,  max:40, text: "Max is eager but holds back the technical details. He wants to help but isn't sure he should." },
      { min:41, max:55, text: "Max is cooperative. He's got skills with the station systems that could be very useful if I ask the right questions." },
      { min:56, max:100,text: "Max is enthusiastic about helping. He's digging into data I didn't even ask for. His ROSIE access could be a game-changer." }
    ],
    clara: [
      { min:0,  max:40, text: "Clara offers professional warmth but nothing personal. General observations only." },
      { min:41, max:55, text: "Clara is opening up. She reads people better than anyone on this station. She's noticed things others haven't." },
      { min:56, max:100,text: "Clara trusts me deeply. She's ready to share what she's observed — and some of it could change everything about this case." }
    ],
    vega: [
      { min:0,  max:40, text: "Vega is terse. 'Everything's running.' He doesn't see why a detective needs to bother maintenance." },
      { min:41, max:55, text: "Vega is more forthcoming. He knows the station's rhythms better than anyone. Something about the night of the murder bothers him." },
      { min:56, max:100,text: "Vega respects my work. He's willing to back me up and share what he knows about the Captain's movements that night." }
    ]
  },

  // ─── LOCATION EVENTS (Day-gated encounters at each location) ─────────
  locationEvents: {
    lab: [
      { id:"d1_lab_scene", day:1, once:true, scene:"d1_lab_investigation",
        requires:null },
    ],
    command_center: [
      { id:"d1_cmd_logs", day:1, once:true, scene:"d1_command_center",
        requires:null },
    ],
    dining_hall: [
      { id:"d1_dining_crew", day:1, once:true, scene:"d1_dining_hall",
        requires:null },
    ],
    medbay: [
      { id:"d1_medbay_liu", day:1, once:true, scene:"d1_medbay",
        requires:{ trustMin:{ liu:50 } } },
      { id:"d1_medbay_low", day:1, once:true, scene:"d1_medbay_low_trust",
        requires:null },
    ],
    comms_room: [
      { id:"d1_comms_emily", dayMin:1, once:true, scene:"d1_comms_room",
        requires:{ trustMin:{ emily:50 } } },
      { id:"d1_comms_locked", dayMin:1, once:true, scene:"d1_comms_locked",
        requires:null },
    ],
    docking_bay: [
      { id:"d1_docking", day:1, once:true, scene:"d1_docking_bay",
        requires:null },
    ],
    quarters: [
      { id:"d1_corridor_whisper", dayMin:2, dayMax:3, once:true, scene:"d1_whisper_event",
        requires:null },
    ],
    observation: [
      { id:"d1_obs_shaw", dayMin:1, once:true, scene:"d1_observation_shaw",
        requires:null },
    ],
    hydroponics: [
      { id:"d1_hydro_das", dayMin:1, once:true, scene:"d1_hydroponics",
        requires:null },
    ]
  },

  // ════════════════════════════════════════════════════════════════════════
  //  SCENES
  // ════════════════════════════════════════════════════════════════════════
  scenes: {

    // ── DAY 0 SCENES (arrival through murder discovery) ────────────────

    arrival: {
      day:0, label:"Chapter 1: Arrival",
      nodes: [
        { type:"bg", key:"docking_bay" },
        { type:"portrait", character:"amelia", variant:"neutral" },
        { type:"narration", text:"The shuttle's docking clamps engage with a resonant clang. Through the viewport, Valkyrie-7 stretches out — a sprawling lattice of habitation rings and research modules, backlit by the pale glow of Europa below." },
        { type:"dialogue", character:"amelia", text:"So this is Valkyrie-7. Even more impressive than the briefings suggested." },
        { type:"portrait", character:"worker", variant:"default" },
        { type:"dialogue", character:"worker", text:"Welcome aboard! First time on Valkyrie-7?" },
        { type:"choice", options: [
          { text:"\"Yes, it's my first time here. Any tips for a newcomer?\"", effects:{trust:{max:5,vega:3}}, journal:"Made a good first impression with the crew.",
            dialogue:[ {type:"dialogue",character:"worker",text:"Happy to help! The observation deck offers a stunning view of Europa."}, {type:"dialogue",character:"worker",text:"By the way, Captain Lawson asked to see you in the command centre."}, {type:"thought",text:"I feel optimistic about this new journey."} ], goto:"meeting_captain" },
          { text:"\"Just passing through.\"",
            dialogue:[ {type:"dialogue",character:"worker",text:"Alright then, safe travels."}, {type:"dialogue",character:"worker",text:"The Captain's expecting you in the command centre."}, {type:"thought",text:"I hope this mission goes smoothly."} ], goto:"meeting_captain" },
          { text:"\"That's none of your concern.\"", effects:{trust:{max:-5,vega:-5}}, journal:"Was curt with a crew member on arrival.",
            dialogue:[ {type:"dialogue",character:"worker",text:"*Frowns slightly.* Sure thing. Let me know if you need anything."}, {type:"dialogue",character:"worker",text:"Captain Lawson wanted to see you as soon as you arrived."}, {type:"thought",text:"I need to keep interactions brief to stay focused."} ], goto:"meeting_captain" }
        ]}
      ]
    },

    meeting_captain: {
      day:0, label:"Chapter 2: Meeting the Captain",
      nodes: [
        { type:"bg", key:"command_center" },
        { type:"portrait", character:"lawson", variant:"default" },
        { type:"narration", text:"The command centre hums with quiet authority. Captain Lawson stands at the central console, her posture immaculate." },
        { type:"dialogue", character:"lawson", text:"Detective Drake, welcome aboard Valkyrie-7. I trust your journey was uneventful?" },
        { type:"choice", options: [
          { text:"\"It was smooth, Captain. Ready to get started.\"", effects:{trust:{lawson:5}}, flag:{met_lawson_professional:true},
            dialogue:[ {type:"dialogue",character:"lawson",text:"Good. We maintain a professional atmosphere here."}, {type:"dialogue",character:"amelia",text:"Understood, Captain."}, {type:"dialogue",character:"lawson",text:"Here's your room key. I've arranged a dinner with the department heads. Feel free to head there now or freshen up."}, {type:"thought",text:"Dinner with the whole crew — a chance to get first impressions."} ] },
          { text:"\"I'm looking forward to meeting the crew. Anything I should know?\"", effects:{trust:{lawson:3}}, flag:{met_lawson_curious:true},
            dialogue:[ {type:"dialogue",character:"lawson",text:"We have a diverse group. Some can be quite passionate."}, {type:"dialogue",character:"amelia",text:"I'll navigate those dynamics carefully."}, {type:"dialogue",character:"lawson",text:"Here's your room key. Dinner with department heads this evening."} ] }
        ]},
        { type:"choice", options: [
          { text:"Go straight to dinner.", journal:"Decided to attend dinner immediately.", goto:"dinner" },
          { text:"Head to my quarters to freshen up first.", journal:"Decided to freshen up before dinner.", goto:"settling_in" }
        ]}
      ]
    },

    settling_in: {
      day:0, label:"Chapter 3A: Settling In",
      nodes: [
        { type:"bg", key:"quarters" }, { type:"portrait", character:"amelia", variant:"neutral" },
        { type:"dialogue", character:"amelia", text:"I think I'll freshen up first." },
        { type:"narration", text:"The quarters are compact but thoughtful — a bunk, a desk with terminal, and a porthole showing Europa's icy surface." },
        { type:"dialogue", character:"amelia", text:"Hmm, there's a message blinking on my terminal." },
        { type:"choice", options: [
          { text:"Read the email from Captain Lawson.", flag:{read_lawson_email:true}, journal:"Read welcome message from Captain Lawson.",
            modal:{ title:"Welcome to Valkyrie-7", sender:"Captain S. Lawson", content:"<p><strong>Welcome, Detective Drake.</strong></p><p>Please understand that this is not your typical assignment. I've arranged tonight's dinner so you can meet key crew members. Be observant.</p><p><strong>Regards,</strong><br>Captain Lawson</p>" },
            dialogue:[ {type:"thought",text:"'Not your typical assignment'... deliberately vague. Noted."} ],
            goto:"settling_in_2" },
          { text:"Read the email from Mum and Dad.", flag:{read_parents_email:true}, journal:"Read message from home.",
            modal:{ title:"Hey Rocket Girl!", sender:"Mum & Dad", content:"<p><strong>Hey Love!</strong></p><p>Words can't express how proud we are! First day on a space station! Keep safe and send a message when you can.</p><p><strong>Love you to the stars and back,</strong><br>Mum and Dad</p>" },
            dialogue:[ {type:"thought",text:"Stars above... 'Rocket Girl.' I'm thirty-one, Mum."} ],
            goto:"settling_in_2" },
          { text:"Skip messages — head to dinner.", journal:"Went to dinner without reading messages.", goto:"hallway_encounter" }
        ]}
      ]
    },

    settling_in_2: { day:0, label:"Chapter 3A: Settling In", nodes: [
      { type:"choice", options: [
        { text:"Head to dinner.", goto:"hallway_encounter" },
        { text:"Take one more moment to gather my thoughts.",
          dialogue:[ {type:"narration",text:"You take a slow breath, straighten your flight suit, and step toward the door."} ], goto:"hallway_encounter" }
      ]}
    ]},

    hallway_encounter: {
      day:0, label:"Chapter 3B: Hallway Encounter",
      nodes: [
        { type:"bg", key:"hallway" }, { type:"portrait", character:"max", variant:"default" },
        { type:"narration", text:"Stepping out, you nearly collide with someone barrelling through the corridor." },
        { type:"dialogue", character:"max", text:"Whoa! Sorry about that!" },
        { type:"thought", text:"The last thing I expected — literally." },
        { type:"choice", options: [
          { text:"\"Are you always this clumsy?\"", effects:{trust:{max:-5}},
            dialogue:[ {type:"dialogue",character:"max",text:"Yikes, no need to bite my head off!"} ], goto:"dinner" },
          { text:"\"Guess we're both still getting our space legs!\"", effects:{trust:{max:5}}, flag:{met_max_hallway:true},
            dialogue:[ {type:"dialogue",character:"max",text:"Ha! I like that. I'm Max, junior engineer."} ], goto:"dinner" },
          { text:"\"If I didn't know better, I'd say you did that on purpose.\"", effects:{trust:{max:10}}, flag:{met_max_hallway:true,max_flirted:true},
            dialogue:[ {type:"dialogue",character:"max",text:"Well, I didn't — but I wouldn't mind taking credit. I'm Max Rodriguez."} ], goto:"dinner" }
        ]}
      ]
    },

    dinner: {
      day:0, label:"Chapter 3: The Dinner",
      nodes: [
        { type:"bg", key:"dining_hall" }, { type:"portrait", character:"lawson", variant:"default" },
        { type:"narration", text:"The dining hall is warmer than expected — soft lighting, the aroma of fresh herbs. The crew is gathered." },
        { type:"dialogue", character:"lawson", text:"Detective Drake, glad you could join us. Let me introduce the team." },
        { type:"portrait", character:"liu",   variant:"default" }, { type:"dialogue", character:"liu",   text:"The new arrival. I hope you enjoy our corner of space." },
        { type:"portrait", character:"shaw",  variant:"default" }, { type:"dialogue", character:"shaw",  text:"Shaw. Security. You need anything, goes through me." },
        { type:"thought", text:"Military bearing. That handshake was formality, not welcome." },
        { type:"portrait", character:"emily", variant:"default" }, { type:"dialogue", character:"emily", text:"Emily Anderson, comms. Welcome aboard, Detective." },
        { type:"portrait", character:"rourke",variant:"default" }, { type:"dialogue", character:"rourke",text:"Detective. I trust you're here to observe, not interfere." },
        { type:"thought", text:"Rourke's reputation precedes him. The reality matches." },
        { type:"portrait", character:"das",   variant:"default" }, { type:"dialogue", character:"das",   text:"Dr. Vikram Das. The herbs in tonight's meal are mine." },
        { type:"portrait", character:"vega",  variant:"default" }, { type:"dialogue", character:"vega",  text:"Marcus Vega. Maintenance. If it breaks, I fix it." },
        { type:"portrait", character:"clara", variant:"default" }, { type:"dialogue", character:"clara", text:"Clara Day, morale officer. How are you finding the station?" },
        { type:"portrait", character:"amelia", variant:"default" },
        { type:"choice", options: [
          { text:"Ask about the station's mission.", flag:{dinner_asked_mission:true},
            dialogue:[ {type:"portrait",character:"lawson",variant:"default"}, {type:"dialogue",character:"lawson",text:"Our primary goal is studying Europa's potential for life."}, {type:"portrait",character:"rourke",variant:"default"}, {type:"dialogue",character:"rourke",text:"'Underfunded and bureaucratically strangled' might be more accurate."}, {type:"thought",text:"Rourke needles Lawson openly. Interesting."} ] },
          { text:"Inquire about day-to-day life.", flag:{dinner_asked_daily:true},
            dialogue:[ {type:"portrait",character:"emily",variant:"default"}, {type:"dialogue",character:"emily",text:"Mostly routine — data transmissions, sample analysis. But Europa throws curveballs."}, {type:"thought",text:"There's tension beneath the surface. I can feel it."} ] }
        ]},
        { type:"narration", text:"As the meal continues, you notice dynamics. Rourke dominates, Liu listens, Shaw eats in silence." },
        { type:"choice", options: [
          { text:"Try to draw Shaw into conversation.", effects:{trust:{shaw:5}}, flag:{dinner_spoke_shaw:true},
            dialogue:[ {type:"dialogue",character:"amelia",text:"Shaw, how long have you been stationed here?"}, {type:"portrait",character:"shaw",variant:"default"}, {type:"dialogue",character:"shaw",text:"Three years. Long enough."}, {type:"thought",text:"Three years with Rourke. That takes discipline — or stubbornness."} ] },
          { text:"Chat with Emily about communications.", effects:{trust:{emily:5}}, flag:{dinner_spoke_emily:true},
            dialogue:[ {type:"portrait",character:"emily",variant:"default"}, {type:"dialogue",character:"emily",text:"Quantum-entangled relay to Earth. Though bandwidth is... rationed."}, {type:"dialogue",character:"amelia",text:"Rationed by whom?"}, {type:"dialogue",character:"emily",text:"By necessity. And Captain's orders, of course."}, {type:"thought",text:"She hesitated. Interesting."} ] },
          { text:"Observe quietly and take mental notes.", effects:{insight:3}, journal:"Observed tense crew dynamics at dinner.", flag:{dinner_observed:true},
            dialogue:[ {type:"thought",text:"Rourke needles Lawson. Lawson deflects. Shaw's jaw tightens every time Rourke speaks. Emily and Max exchange glances."}, {type:"thought",text:"This station has been simmering long before I arrived."} ] }
        ]},
        { type:"portrait", character:"lawson", variant:"default" },
        { type:"dialogue", character:"lawson", text:"Well, productive evening. Eyes forward, team." },
        { type:"portrait", character:"rourke", variant:"default" },
        { type:"dialogue", character:"rourke", text:"Yes, Captain. Wouldn't want to miss another round of 'mission-critical deliverables.'" },
        { type:"thought", text:"That landed like a slap. Lawson didn't flinch, but her knuckles whitened." },
        { type:"goto", scene:"evening_quarters" }
      ]
    },

    evening_quarters: { day:0, label:"Chapter 4: Evening", nodes: [
      { type:"bg", key:"quarters" }, { type:"portrait", character:"amelia", variant:"neutral" },
      { type:"narration", text:"Back in your quarters, the station settles into night cycle." },
      { type:"choice", options: [
        { text:"Review notes in my smart-folio.", flag:{reviewed_notes:true}, journal:"Reviewed first impressions of the crew.",
          dialogue:[ {type:"thought",text:"Lawson: controlled, watching me. Shaw: guarded, something eating at him. Rourke: arrogant, making enemies. Emily: friendly, holding back."} ] },
        { text:"Try to get some rest.",
          dialogue:[ {type:"thought",text:"Something about this station doesn't sit right. Maybe it'll come to me in the morning."} ] }
      ]},
      { type:"narration", text:"You drift into an uneasy sleep." },
      { type:"goto", scene:"murder_discovery" }
    ]},

    murder_discovery: { day:0, label:"Chapter 5: Midnight", nodes: [
      { type:"bg", key:"quarters" }, { type:"portrait", character:"amelia", variant:"sad" },
      { type:"narration", text:"A sharp alarm tears through the silence. Red emergency lighting floods your quarters." },
      { type:"dialogue", character:"lawson", text:"All hands, report to stations immediately. We have a... situation." },
      { type:"portrait", character:"shaw", variant:"default" },
      { type:"dialogue", character:"shaw", text:"Detective. You need to come with me. Now." },
      { type:"dialogue", character:"amelia", text:"What's happened?" },
      { type:"dialogue", character:"shaw", text:"It's Dr. Rourke. He's dead." },
      { type:"thought", text:"The man who was needling the Captain hours ago. Dead." },
      { type:"clue", id:"first_on_scene" },
      { type:"choice", options: [
        { text:"\"Where was the body found?\"", effects:{trust:{shaw:3}}, journal:"Rourke found dead in research lab. Door locked from inside.", flag:{asked_location:true},
          dialogue:[ {type:"dialogue",character:"shaw",text:"Research lab. Door was locked from inside."}, {type:"thought",text:"Locked from inside. Someone who knows the station's systems."} ] },
        { text:"\"Who found him?\"", effects:{trust:{shaw:2}}, journal:"Shaw discovered Rourke's body during a late patrol.", flag:{asked_who_found:true},
          dialogue:[ {type:"dialogue",character:"shaw",text:"I did. Late patrol. Heard a crash."}, {type:"thought",text:"Shaw found the body. First responder or last person to see Rourke alive. Or both."} ] },
        { text:"Stay silent and observe Shaw.", effects:{insight:5}, journal:"Observed Shaw's controlled but evasive demeanour.", flag:{observed_shaw_discovery:true},
          dialogue:[ {type:"thought",text:"Shaw's breathing is controlled — military cadence. In-two, out-four. Hands steady, but he won't meet my eyes."} ] }
      ]},
      { type:"bg", key:"lab" }, { type:"portrait", character:"lawson", variant:"default" },
      { type:"dialogue", character:"lawson", text:"Detective Drake. You are lead investigator. No one leaves until we have answers." },
      { type:"dialogue", character:"lawson", text:"I've locked down communications and restricted access. You'll have my full cooperation. I expect daily reports." },
      { type:"thought", text:"Full cooperation — and daily reports. She wants to help, but she also wants to control the information." },
      { type:"journal", entry:"Dr. Marcus Rourke found dead in the research lab. Five days until the Chief Inspector arrives." },
      { type:"flag", key:"day0_complete", value:true },
      { type:"narration", text:"The investigation begins tomorrow. Five days to find the truth." },
      { type:"narration", text:"— End of Day 0 —" },
      { type:"start_investigation" },
      { type:"goto", scene:"day1_briefing" }
    ]},


    // ── DAY 1 SCENES ──────────────────────────────────────────────────

    day1_briefing: { day:1, label:"Day 1: Morning Briefing", nodes: [
      { type:"bg", key:"command_center" }, { type:"portrait", character:"lawson", variant:"default" },
      { type:"narration", text:"Morning. The station feels different now — the crew moves in hushed clusters, avoiding eye contact. Lawson has assembled everyone in the command centre." },
      { type:"dialogue", character:"lawson", text:"Good morning. I want to remind everyone that Detective Drake has full authority over this investigation. Cooperation is not optional." },
      { type:"dialogue", character:"lawson", text:"Detective, the research lab has been sealed since last night. You have three investigation periods today before I'll need your evening report." },
      { type:"thought", text:"Three chances to get answers. I need to use them wisely. The lab is the obvious starting point, but talking to crew might be just as valuable." },
      { type:"narration", text:"The crew disperses to their stations. The investigation begins." }
    ]},

    // Location event scenes for Day 1
    d1_lab_investigation: { day:1, label:"Research Lab — Crime Scene", nodes: [
      { type:"bg", key:"lab" }, { type:"portrait", character:"amelia", variant:"default" },
      { type:"narration", text:"The research lab is still sealed with security tape. Inside, the signs of violence are unmistakable." },
      { type:"clue", id:"lab_struggle" },
      { type:"thought", text:"Overturned equipment. Scattered samples. Scuff marks on the floor. This wasn't a quiet death — there was a fight." },
      { type:"narration", text:"On Rourke's terminal, a document catches your eye — a list of names with bitter annotations." },
      { type:"clue", id:"enemies_list" },
      { type:"thought", text:"Rourke kept a list of people who wronged him. Petty insults next to each name. The man made enemies everywhere." },
      { type:"choice", options: [
        { text:"Examine the door lock mechanism.", flag:{examined_lab_lock:true},
          dialogue:[ {type:"thought",text:"The lock was overridden, not forced. Whoever opened this door had a security code or a keycard with sufficient clearance."}, {type:"thought",text:"That narrows it down — but several people have lab access."} ] },
        { text:"Search for personal effects.",
          dialogue:[ {type:"narration",text:"Among the scattered debris, you notice Rourke's personal tablet is missing. Everything else — samples, notes, equipment — is still here."}, {type:"thought",text:"Someone took the tablet. Or Rourke moved it before the confrontation."} ],
          journal:"Rourke's personal tablet is missing from the lab." },
        { text:"Check for signs of clean-up.",
          dialogue:[ {type:"thought",text:"Wait. The scuff marks end abruptly near the secondary console. Someone started cleaning this scene and stopped partway through."}, {type:"thought",text:"A panicked cover-up, abandoned when they realised it was pointless? Or interrupted?"} ],
          journal:"Evidence of a partial clean-up attempt at the crime scene.", flag:{noticed_cleanup:true} }
      ]}
    ]},

    d1_command_center: { day:1, label:"Command Center — Security Logs", nodes: [
      { type:"bg", key:"command_center" }, { type:"portrait", character:"amelia", variant:"default" },
      { type:"narration", text:"The command centre terminals glow with security data. Badge access logs, personnel files, cargo manifests — all at your fingertips." },
      { type:"thought", text:"Let's see who was where on the night of the murder." },
      { type:"clue", id:"shaw_badge_log" },
      { type:"dialogue", character:"amelia", text:"Shaw's badge pinged near the lab at 03:12. He said he found the body on a late patrol — that tracks. But was he arriving or leaving?" },
      { type:"narration", text:"Something else catches your eye in the logs..." },
      { type:"clue", id:"pierce_lab_key" },
      { type:"thought", text:"Pierce's keycard accessed the lab at 01:30. Ninety minutes before Shaw. What was he doing there in the middle of the night?" },
      { type:"narration", text:"You pull up personnel files. Shaw's record is... extensive." },
      { type:"clue", id:"combat_training" },
      { type:"thought", text:"Eight years Colonial Marines. Close-combat specialist. If Shaw wanted someone dead with his bare hands, he'd know exactly how." },
      { type:"narration", text:"In the cargo manifests, an anomaly: two entries for the same crate, logged three minutes apart." },
      { type:"clue", id:"dup_manifest" },
      { type:"thought", text:"Duplicate entry. Could be a clerical error. Or someone was moving or replacing something and logged it twice. I should keep this in mind." },
      { type:"choice", options: [
        { text:"Check Liu's formal complaint about Rourke.",
          dialogue:[ {type:"clue",id:"liu_complaint"}, {type:"thought",text:"Liu filed a formal safety complaint about Rourke's experiments two weeks ago. Through proper channels. The kind of person who files complaints isn't usually the kind who commits murder."} ] },
        { text:"Look for anything else unusual.", flag:{thorough_cmd_search:true},
          dialogue:[ {type:"thought",text:"Nothing else jumps out from the standard logs. But the deeper systems — ROSIE's patrol data, comms traffic — would need someone with specialist access to pull."} ] }
      ]}
    ]},

    d1_dining_hall: { day:1, label:"Dining Hall — Crew Conversations", nodes: [
      { type:"bg", key:"dining_hall" },
      { type:"narration", text:"The dining hall has become an informal gathering point. Small groups huddle over cooling coffee, speaking in low voices." },
      { type:"portrait", character:"clara", variant:"default" },
      { type:"dialogue", character:"clara", text:"Detective. How are you holding up? I know this isn't the assignment you were expecting." },
      { type:"choice", options: [
        { text:"\"I'm fine. What can you tell me about Shaw and Rourke?\"",
          dialogue:[ {type:"clue",id:"shaw_rourke_rivalry"}, {type:"dialogue",character:"clara",text:"Those two? Oil and water doesn't cover it. The grudge goes back years — before the station. Something personal."}, {type:"portrait",character:"max",variant:"default"}, {type:"dialogue",character:"max",text:"Yeah, I heard they went to the same school. Rourke apparently stole Shaw's girlfriend or something."}, {type:"clue",id:"gossip_fight"}, {type:"dialogue",character:"clara",text:"There was a screaming match between them two days ago. The whole corridor heard it."}, {type:"thought",text:"A rivalry predating the station. A public fight days before the murder. Shaw had motive — that much is obvious."} ] },
        { text:"\"Tell me about Rourke. Who else had issues with him?\"",
          dialogue:[ {type:"clue",id:"shaw_rourke_rivalry"}, {type:"dialogue",character:"clara",text:"Who didn't? Rourke was brilliant but impossible. Shaw had the oldest grudge, but Pierce resented him for blocking promotions, Marquez hated his funding games..."}, {type:"clue",id:"pierce_grudge"}, {type:"dialogue",character:"clara",text:"Pierce actually said 'someone should deal with him' last week. In front of half the crew."}, {type:"clue",id:"gossip_fight"}, {type:"thought",text:"Everyone had motive. That's the problem — and maybe the point."} ] }
      ]}
    ]},

    d1_medbay: { day:1, label:"Medical Bay — Autopsy Results", nodes: [
      { type:"bg", key:"medbay" }, { type:"portrait", character:"liu", variant:"default" },
      { type:"dialogue", character:"liu", text:"Detective. I've completed my preliminary examination. It's... not pleasant." },
      { type:"clue", id:"autopsy_results" },
      { type:"dialogue", character:"liu", text:"Blunt force trauma to the head and upper body. Multiple strikes. Consistent with a trained fighter — someone who knew exactly where to hit." },
      { type:"thought", text:"That matches Shaw's combat background. But it also rules out people without that training." },
      { type:"choice", options: [
        { text:"\"Could this have been accidental?\"",
          dialogue:[ {type:"dialogue",character:"liu",text:"No. The pattern is too deliberate. This was rage, Detective. Controlled, focused rage."} ] },
        { text:"\"Does this rule out anyone?\"", effects:{insight:2},
          dialogue:[ {type:"dialogue",character:"liu",text:"Pierce and Marquez don't have combat training. If either of them did this, it wasn't with their fists."}, {type:"thought",text:"Good. That narrows things — assuming the autopsy is right."} ] }
      ]}
    ]},

    d1_medbay_low_trust: { day:1, label:"Medical Bay", nodes: [
      { type:"bg", key:"medbay" }, { type:"portrait", character:"liu", variant:"default" },
      { type:"dialogue", character:"liu", text:"Detective. I'm still working on the examination. The results will take time." },
      { type:"thought", text:"She's not ready to share yet. I should come back when we've built more rapport." }
    ]},

    d1_comms_room: { day:1, label:"Comms Room — Emily", nodes: [
      { type:"bg", key:"comms_room" }, { type:"portrait", character:"emily", variant:"default" },
      { type:"dialogue", character:"emily", text:"Detective! Come in. I've been going through the comms traffic from that night." },
      { type:"clue", id:"comms_restricted" },
      { type:"dialogue", character:"emily", text:"Here's the thing — external communications were restricted to command-only access before the body was even found. Captain's override." },
      { type:"thought", text:"Before the body was found? That means either Lawson knew something was going to happen, or..." },
      { type:"dialogue", character:"emily", text:"I don't know what it means. But it's odd, right?" },
      { type:"choice", options: [
        { text:"\"Very odd. Keep digging — I trust you.\"", effects:{trust:{emily:5}},
          dialogue:[ {type:"dialogue",character:"emily",text:"I will. And Detective — there's something else. Something I've been monitoring privately."}, {type:"thought",text:"She almost told me something more. She's not quite ready. But she will be."} ] },
        { text:"\"Can you pull ROSIE's patrol data too?\"",
          dialogue:[ {type:"dialogue",character:"emily",text:"That's Max's department — the engineering systems. I can ask him, or you could."}, {type:"thought",text:"I'll need Max's help for the drone data. Another thread to pull."} ] }
      ]}
    ]},

    d1_comms_locked: { day:1, label:"Comms Room", nodes: [
      { type:"bg", key:"comms_room" }, { type:"portrait", character:"emily", variant:"default" },
      { type:"dialogue", character:"emily", text:"Detective. I'd love to help, but comms traffic is classified. Captain's orders." },
      { type:"thought", text:"She knows something about those logs. I can see it in the way she glanced at the terminal. But she's not ready to share — not yet." },
      { type:"choice", options: [
        { text:"\"I understand. I'll come back.\"",
          dialogue:[ {type:"dialogue",character:"emily",text:"I'm sorry. I hope you understand."} ] },
        { text:"\"I found an anomaly in the cargo manifests. I could keep it between us...\"",
          condition:{ hasClue:"dup_manifest" }, leverageTag:"leverage",
          effects:{trust:{emily:8}}, flag:{traded_manifest_for_comms:true},
          dialogue:[ {type:"dialogue",character:"emily",text:"You'd... keep that out of your report?"}, {type:"dialogue",character:"amelia",text:"If you show me what's in those comms logs."}, {type:"dialogue",character:"emily",text:"...Alright. Come look at this."}, {type:"clue",id:"comms_restricted"}, {type:"dialogue",character:"emily",text:"External comms were restricted before the body was found. Captain's override."}, {type:"thought",text:"The trade worked. And what she's showing me changes everything."} ] }
      ]}
    ]},

    d1_docking_bay: { day:1, label:"Docking Bay", nodes: [
      { type:"bg", key:"docking_bay" }, { type:"portrait", character:"vega", variant:"default" },
      { type:"dialogue", character:"vega", text:"Detective. Checking the cargo area?" },
      { type:"dialogue", character:"amelia", text:"Just being thorough. Anything unusual lately?" },
      { type:"clue", id:"airlock_anomaly" },
      { type:"dialogue", character:"vega", text:"Actually, airlock 3 cycled at 04:15 that night. Could be routine pressure equalization, but the timing's funny." },
      { type:"thought", text:"04:15. After the estimated time of death. Someone disposing of evidence? Or just the station breathing." },
      { type:"choice", options: [
        { text:"Investigate the airlock further.",
          dialogue:[ {type:"narration",text:"You examine the airlock logs in detail. The cycling was automated — routine pressure equalization triggered by temperature differential."}, {type:"thought",text:"Dead end. But now I know more about how the station's systems work. That might be useful later."} ],
          flag:{investigated_airlock:true} },
        { text:"Ask Vega about the crew's movements.",
          dialogue:[ {type:"dialogue",character:"vega",text:"I don't track people, Detective. I track systems. But I know who keeps the station running and who just makes noise."}, {type:"thought",text:"Vega's quiet, but he notices things. I should build a better rapport with him."} ] }
      ]}
    ]},

    d1_observation_shaw: { day:1, label:"Observation Deck", nodes: [
      { type:"bg", key:"observation" }, { type:"portrait", character:"shaw", variant:"default" },
      { type:"narration", text:"Shaw stands alone at the observation viewport, Europa's pale surface reflected in the glass. He doesn't turn when you approach." },
      { type:"dialogue", character:"shaw", text:"Detective." },
      { type:"choice", options: [
        { text:"\"Daniel, I'm not here to hang you out an airlock.\"", effects:{trust:{shaw:10,shawGuilt:-5}}, flag:{called_shaw_daniel:true},
          dialogue:[ {type:"narration",text:"Shaw's shoulders drop a fraction. He turns to face you."}, {type:"dialogue",character:"shaw",text:"...Nobody calls me Daniel except—"}, {type:"narration",text:"He stops. Something flickers across his face — pain, old and deep."}, {type:"dialogue",character:"shaw",text:"What do you want to know?"}, {type:"thought",text:"He almost said a name. Someone who used to call him Daniel. There's more to this man than a grudge."} ] },
        { text:"\"Your badge pinged near the lab at 03:12.\"", condition:{hasClue:"shaw_badge_log"}, leverageTag:"evidence",
          effects:{trust:{shaw:-5}},
          dialogue:[ {type:"dialogue",character:"shaw",text:"I told you — I was on patrol. I found the body."}, {type:"dialogue",character:"amelia",text:"At 03:12. Convenient timing."}, {type:"dialogue",character:"shaw",text:"You'd better be damn sure before you accuse me, Detective."}, {type:"thought",text:"He's defensive but not panicked. A guilty man would have prepared a better answer."} ] },
        { text:"Ask about his relationship with Rourke.", condition:{hasClue:"shaw_rourke_rivalry"},
          dialogue:[ {type:"dialogue",character:"shaw",text:"Rourke was... he took things from people. Things they couldn't get back."}, {type:"thought",text:"He's not talking about scholarships. Something deeper. Something personal."}, {type:"dialogue",character:"shaw",text:"That's all I'm saying. For now."} ] }
      ]}
    ]},

    d1_hydroponics: { day:1, label:"Hydroponics Bay", nodes: [
      { type:"bg", key:"hydroponics" }, { type:"portrait", character:"das", variant:"default" },
      { type:"dialogue", character:"das", text:"Ah, Detective. Come, sit among the green. It helps the mind settle." },
      { type:"narration", text:"The hydroponics bay is an oasis — rows of vegetables, flowering herbs, and small fruit trees under warm grow-lights." },
      { type:"dialogue", character:"das", text:"Dr. Rourke was a man of great ambition and very little wisdom. A weed, if you'll forgive the metaphor — vigorous growth, but choking everything around it." },
      { type:"choice", options: [
        { text:"\"Did you have problems with Rourke?\"",
          dialogue:[ {type:"dialogue",character:"das",text:"He wanted to use my hydroponics systems for his experiments. Bio-samples in the nutrient beds. I refused, of course."}, {type:"dialogue",character:"das",text:"He went over my head to Lawson, who sided with me. One of the few times she and I agreed."}, {type:"thought",text:"Even the gentlest person on the station had conflicts with Rourke."} ] },
        { text:"\"What can you tell me about the crew dynamics?\"", effects:{trust:{das:5}},
          dialogue:[ {type:"dialogue",character:"das",text:"This station is a garden too, Detective. Some plants support each other. Others compete for light."}, {type:"dialogue",character:"das",text:"Watch Emily and Max — they look out for each other. Watch Shaw — he is a plant that has stopped growing. Something is dying inside him."}, {type:"thought",text:"Das sees more than he lets on. And his observation about Shaw echoes what I've sensed."} ] }
      ]}
    ]},

    d1_whisper_event: { day:2, label:"Crew Quarters — Corridors", nodes: [
      { type:"bg", key:"quarters" }, { type:"portrait", character:"amelia", variant:"default" },
      { type:"narration", text:"Walking the residential corridor, you catch fragments of a hushed conversation around the corner—" },
      { type:"clue", id:"overheard_whisper" },
      { type:"narration", text:"'If they check the logs, we're burned.'" },
      { type:"narration", text:"You quicken your pace, but the speakers have already rounded another corner. You catch only retreating footsteps." },
      { type:"thought", text:"Two voices, one male, one female. But who? And which logs are they worried about?" },
      { type:"journal", entry:"Overheard two people discussing hidden logs." },
      // NOTE (Oct 2026): the last few lines of this file were lost to file damage on Sam's computer.
      // The end of the journal entry above and the closing brackets below were rebuilt by Claude.
      { type:"thought", text:"Someone on this station has something to hide. I need to find out which logs could burn them." }
    ]}

  }
  // END OF SCENES
};
