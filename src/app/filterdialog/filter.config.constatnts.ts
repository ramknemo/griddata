export class TextFilterType {
    private static types:string[]=[TextFilterType.CONSIST(),TextFilterType.BEGIN(),TextFilterType.END()];
    static CONSIST(){
        return "CONSIST";
    }
    static BEGIN(){
        return "BEGIN";
    }
    static END(){
        return "END";
    }
    static getAllTypes():string[]{
        return TextFilterType.types;
    }
}



export class NumberFilterType {
    private static types:string[]=[NumberFilterType.BIGGER(),NumberFilterType.SlOWER(),NumberFilterType.EQUALS()];
    static BIGGER(){
        return "BIGGER";
    }
    static SlOWER(){
        return "SlOWER";
    }
    static EQUALS(){
        return "EQUALS";
    }
    static getAllTypes():string[]{
        return NumberFilterType.types;
    }
}


