class QueryHandler{
    constructor(model, query){
        this.model = model;
        this.query = {...query};
        this.queryCopy = {...query};
        this.limit = 50;
        this.page = 1;
        this.sort = 'createdAt';
        this.select = '';
    }


    async getData(){
        const removeFields = ['sort', 'page', 'limit', 'fields'];
        
        removeFields.forEach((field) =>{
            if (this.query[field]) {
                delete this.query[field];
            }
        });

        this.query = JSON.stringify(this.query);

        this.query = this.query.replace(/\b(gt|gte|lt|lte)\b/g, (match) =>{
            return `$${match}`
        });

        this.query = JSON.parse(this.query);

        //*Allow sort
        if (this.queryCopy.sort) {
            this.sort = this.queryCopy.sort.replace(/,/g,(match)=>{
                return ' ';
            });
        }

        //*Allow limit
        if (this.queryCopy.limit) {
            this.limit = parseInt(this.queryCopy.limit) || this.limit;
        }

        //*Allow page selection
        const docsCount = await this.model.countDocuments();
        const totalPages = Math.ceil(docsCount / this.limit);
        if (this.queryCopy.page) {
            this.page = parseInt(this.queryCopy.page) || this.page;
            if(this.page > totalPages){
                this.page = totalPages;
            }
        }

        //*Select specific fields
        if(this.queryCopy.fields){
            let fields = this.queryCopy.fields;
            fields = fields.replace(/,/g, (match) =>{
                return ` `;
            }); 
            this.select = ''+ fields
        }


        //TODO: i think this is a hack and there should be
        //TODO: a better way to return the query as i did in the comment below
        //TODO: MARK => check this propblem later
        return ()=>{
            return this.model
            .find(this.query)
            .sort(this.sort)
            .skip((this.page-1) * this.limit)
            .limit(this.limit)
            .select(this.select)
        }
        
        /* return this.model
            .find(this.query)
            .sort(this.sort)
            .skip((this.page-1) * this.limit)
            .limit(this.limit)
            .select(this.select)
            // .lean() */
    }

    async getPagination(){
        const docsCount = await this.model.countDocuments();
        const totalPages = Math.ceil(docsCount / this.limit);

        let pagination = {
            totalPages,
            currentPage:this.page,
        };

        if(this.page < totalPages){
            pagination.nextPage = this.page + 1;
        }

        if(this.page > 1){
            pagination.prevPage = this.page - 1;
        }
        return pagination;
    }
};

module.exports = QueryHandler;