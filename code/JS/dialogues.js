/**
 * An object literal holding all dialogues and choices.
 */
dialogues = {
    day1: {
        fisher: {
            intro: [
                "Fisher: This is weird. The lake's changing lately...",
                "Fisher: Oh hi there! What brings you here?"
            ],
            options: {
                help: [
                    "(Help with fishing)",
                    "Fisher: You're willing to help me? Thanks a lot!",
                    "(You helped the fisher with fishing today. He is happy about it.)"
                ],
                sabotage: [
                    "(Persuade fisher to skip work)",
                    "Fisher: Wow this is not what I expected you to say! But... no harm trying to do so!",
                    "(You persuaded the fisher to skip work. He appreciated your encouragement.)"
                ],
                leave: [
                    "(Leave)",
                    "Fisher: Already leaving? See you another day then!",
                    "(You decided not to intervene at all.)"
                ]
            }       
        },

        builder: {
            intro: [
                "Builder: Constructing this house feels like never-ending...",
                "Builder: Hello. Anything I can help with?"
            ],
            options: {
                help: [
                    "(Help with constructing)",
                    "Builder: Thanks. This isn't going to be easy though, let me guide you.",
                    "(You helped the builder with construction today. He is very grateful.)"
                ],
                sabotage: [
                    "(Persuade builder to skip work)",
                    "Builder: You know me well, stranger. Thanks for giving me a push to do this.",
                    "(You persuaded the builder to skip work. He appreciated your encouragement.)"
                ],
                leave: [
                    "(Leave)",
                    "Builder: Wish you a wonderful day.",
                    "(You decided not to intervene at all.)"
                ]
            },
        },

        farmer: {
            intro: [
                "Farmer: Lovely crops means a lovely day, heehee!",
                "Farmer: Hi! Welcome to my farm!"
            ],
            options: {
                help: [
                    "(Help with farming)",
                    "Farmer: Thank you very much! An extra hand is always helpful!",
                    "(You helped the farmer with farming today. She is thankful about this.)"
                ],
                sabotage: [
                    "(Persuade farmer to skip work)",
                    "Farmer: Since the crops are doing well today... You're right, let's do this!",
                    "(You persuaded the farmer to skip work. She appreciated your encouragement.)"
                ],
                leave: [
                    "(Leave)",
                    "Farmer: It was great to talk to you!",
                    "(You decided not to intervene at all.)"
                ]
            }    
        },

        woodcutter: {
            intro: [
                "Woodcutter: Why are there so many trees to cut?",
                "Woodcutter: Hello, kid. You need anything?"
            ],
            options: {
                help: [
                    "(Help with cutting wood.)",
                    "Woodcutter: Thank you. Here's an extra axe.",
                    "(You helped the woodcutter with cutting wood today. He appreciates your help.)"
                ],
                sabotage: [
                    "(Persuade woodcutter to skip work)",
                    "Woodcutter: Nice suggestion. Sufficient rest is necessary for another day of hard work.",
                    "(You persuaded the woodcutter to skip work. He appreciated your encouragement.)"
                ],
                leave: [
                    "(Leave)",
                    "Woodcutter: See you.",
                    "(You decided not to intervene at all.)"
                ]
            }                
        },
        dayEnd: [
            "(Doesn't seem like there's more I can do.)",
            "(Guess that's it for today then.)"
        ]
    },

    day2: {

    },

    day3: {

    },

    day4: {
        
    },

    day5: {
        
    },

    day6: {
        
    },

    day7: {
        
    }
};