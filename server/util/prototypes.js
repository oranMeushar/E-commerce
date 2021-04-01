String.prototype.toCapitalSingular = function(){
    let result = this.slice(0, this.length-1);
    result = result.charAt(0).toUpperCase() + result.slice(1);
    return result;
}