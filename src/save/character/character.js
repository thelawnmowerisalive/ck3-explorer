
class FamilyData {
    primary_spouse = -1;
    spouse = -1;
    child = [];
}

class Character {
    first_name = '';
    birth = '';
    female;
    nickname_text = '';

    culture = -1;
    faith = -1;
    dynasty_house = -1;

    skill = [];
    traits = [];

    family_data = new FamilyData();
}

class DeadData {
    date = '';
    reason = '';
}

class DeadCharacter extends Character {
    dead_data = new DeadData();
}

class PersonalCurrency {
    currency = -1;
    accumulated = -1;
}

class AliveData {
    gold = -1;
    income = -1;
    fertility = -1;
    health = -1;
    piety = new PersonalCurrency();
    prestige = new PersonalCurrency();
    schemes = [];
    secrets = [];
    perk = [];
    memories = [];
}

class LivingCharacter extends Character {
    alive_data = new AliveData();
}

export { Character, LivingCharacter, DeadCharacter };