import { makeAutoObservable } from "mobx"

const baseUrl = "https://localhost:32768"

class GlobalStore {

    accountId = null
    apiKey = null 
    account = null

    constructor() {
        makeAutoObservable(this)
    }


    // API Calls
    async getAccount() {
        const response = await fetch(`${baseUrl}/accounts/11`);
        const account = await response.json();
        this.account = account
    }

    async  postData(url = "", data = {}) {

        const response = await fetch(url, {
          method: "POST", 
          mode: "cors", 
          cache: "no-cache", 
          credentials: "same-origin", 
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data), 
        });
        return response.json(); 
      }

      async  putData(url = "", data = {}) {
  
        const response = await fetch(url, {
          method: "PUT", 
          mode: "cors", 
          cache: "no-cache", 
          credentials: "same-origin", 
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow", 
          referrerPolicy: "no-referrer", 
          body: JSON.stringify(data), 
        });

        console.log(response);
        return response.json; 
      }

      async  deleteData(url = "") {

        const response = await fetch(url, {
          method: "DELETE", 
          referrerPolicy: "no-referrer", 
        });
        console.log(response.status)
        return response.status; 
      }

    // Accounts

    async deleteAccountById(id)
    {
        const response = await this.deleteData(`${baseUrl}/accounts/${id}`);
        if(response === 204)
        {
            this.account = null
        }      
    }

    async updateAccountEmailById(item)
    {
        // Find object in Array
        const id= item.id
        this.account.emailAddress = item.emailAddress

        // Update Item properties
        // Call API
        await this.putData(`${baseUrl}/accounts/${id}`,item)
    }

    // ExcludedUrls
    async deleteExcludedUrlById(id)
    {
        const response = await this.deleteData(`${baseUrl}/urlexclusions/${id}`);
        if(response === 204)
        {
            const index = this.account.urlExclusions.findIndex(excludedUrl => excludedUrl.id === id)
            if(index > -1)
            {
                this.account.urlExclusions.splice(index,1)
            }
        }      
    }

    async addExcludedUrl(item)
    {
        // Create object
        const excludedUrl = {
            excludedUrl: item,
            accountId: this.account.id
        }

        // Call API
        const excludedUrlData = await this.postData(`${baseUrl}/urlexclusions`,excludedUrl)

        // Add to Array
        this.account.urlExclusions.push(excludedUrlData)
    }

    async editExcludedUrlById(item)
    {
        // Find object in Array
        const id= item.id
        const index = this.account.urlExclusions.findIndex(excludedUrl => excludedUrl.id === id)
        const excludedUrlEdit = this.account.urlExclusions[index]
        excludedUrlEdit.excludedUrl = item.excludedUrl

        // Call API
        const excludedUrlData = await this.putData(`${baseUrl}/urlexclusions/${excludedUrlEdit.id}`,excludedUrlEdit)

        // Remove Old
        this.account.urlExclusions.splice(index,1)

        // Add to Array
        this.account.urlExclusions.push(excludedUrlData)
   
    }

    // Fallback Urls
    async editFallbackUrlById(item)
    {
        await this.putData(`${baseUrl}/FallBackUrls/${item.id}`,item)
        // Find object in Array
        this.account.fallBackUrls.fallBackUrl = item.fallBackUrl

    }

    // Custom Domains
    async editCustomDomainById(item)
    {
        console.log(item);
        item.validated = false

        const customDomainData = await this.putData(`${baseUrl}/CustomDomains/${item.id}`,item)
        this.account.customDomains = item

    }

    async deleteCustomDomainById(id)
    {
        await this.deleteData(`${baseUrl}/CustomDomains/${id}`)

        this.account.customDomains = null
    }

    async verifyCustomDomainById(id)
    {
        const response = await fetch(`${baseUrl}/CustomDomains/${id}`);
        if(response === 200)
        {
            this.account.customDomains.validated = true
        }
    }

    async addCustomDomain(item)
    {
        // Create object
        const customDomain = {
            domain: item,
            accountId: this.account.id,
            domainCertificate: null,
            verificationCode: null
        }
 
        // Call API
        const customDomainData = await this.postData(`${baseUrl}/CustomDomains`,customDomain)

        // Add to Array
        this.getAccount()

    }

    // Users

    async editUserById(item)
    {
        // Find object in Array
        console.log(item);
        const id= item.id
        console.log(id);
        const index = this.account.Users.findIndex(user => user.id === id)
        const userEdit = this.account.Users[index]

        // Add updated attributes
        userEdit.firstName = item.firstName
        userEdit.lastName = item.lastName
        userEdit.emailAddress = item.emailAddress

        console.log("Updating Data", userEdit);
        console.log(userEdit);

        // Call API
        const userData = await this.putData(`${baseUrl}/users/${userEdit.id}`,userEdit)

        // Remove Old
        this.account.userEdit.splice(index,1)

        // Add to Array
        this.account.userEdit.push(userData)
        console.log(userData);
    }

    async addUser(item)
    {
        // Create object
        const user = {
            firstName: item.firstName,
            lastName: item.lastName,
            emailAddress: item.emailAddress,
            userPassword: item.userPassword,
            accountId: this.account.id
        }

        // Call API
        const userData = await this.postData(`${baseUrl}/users`,user)

        // Add to Array
        this.getAccount()
    }

    async deleteUser(id)
    {
        const response = await this.deleteData(`${baseUrl}/users/${id}`);
        if(response === 204)
        {
            const index = this.account.users.findIndex(user => user.id === id)
            if(index > -1)
            {
                this.account.users.splice(index,1)
            }
        }      
    }

    

    // Urls

    async addSingleUrl(item)
    {
        // Create object
        const singleUrl = {
            originalUrl: item.originalUrl,
            accountId: this.account.id
        }

        // Call API
        const singleUrlData = await this.postData(`${baseUrl}/single`,singleUrl)

        // Add to Array
        this.getAccount()
    }

    async addIntelligentUrl(item)
    {
        // Create object
        const intelligentUrl = {
            originalUrl: item.originalUrl,
            accountId: this.account.id
        }

        // Call API
        const intelligentUrlData = await this.postData(`${baseUrl}/intelligent`,intelligentUrl)

        // Add to Array
        this.getAccount()
    }

    // Provide Easy Access to Sub Objects
    get accounts(){return this.account??[]}
    get users(){return this.account?.users??[]}
    get fallBackUrls(){return this.account?.fallBackUrls??[]}
    get urlExclusions(){return this.account?.urlExclusions??[]}
    get customDomains(){return this.account?.customDomains??[]}
    get urls(){return this.account?.urls??[]}

}

export const globalStore = new GlobalStore()
