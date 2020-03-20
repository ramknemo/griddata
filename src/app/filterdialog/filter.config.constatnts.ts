export class TextFilterType {
    private static types:string[]=[
        TextFilterType.CONSIST(),
        TextFilterType.BEGIN(),
        TextFilterType.END(),
        TextFilterType.EQUALS(),
        TextFilterType.NO_EQUALS(),
        TextFilterType.NO_CONSIST()];
    static CONSIST(){
        return "CONSIST";
    }
    static BEGIN(){
        return "BEGIN";
    }
    static END(){
        return "END";
    }
    static EQUALS(){
        return "EQUALS";
    }
    static NO_EQUALS(){
        return "NO_EQUALS";
    }
    static NO_CONSIST(){
        return "NO_CONSIST";
    }
    static getAllTypes():string[]{
        return TextFilterType.types;
    }
}



export class NumberFilterType {
    private static types:string[]=[NumberFilterType.BIGGER(),
        NumberFilterType.SlOWER(),
        NumberFilterType.EQUAL(),
        NumberFilterType.BETWEEN()];
    static BIGGER(){
        return "BIGGER";
    }
    static SlOWER(){
        return "SlOWER";
    }
    static EQUAL(){
        return "EQUAL";
    }
    static BETWEEN(){
        return "BETWEEN";
    }
    static getAllTypes():string[]{
        return NumberFilterType.types;
    }
}


