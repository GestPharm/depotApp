export class ValidationFields {
    
    errors : string[] = [];
    warnings: string[] = [];
   
    constructor({
      
      errors,
      warnings
    }: {
        errors: string[] ,
        warnings: string[] 
       
      
    }) {
      
      this.errors = errors;
      this.warnings = warnings;
      
    }
}
