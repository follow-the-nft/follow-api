
# Database Model Schema

Below is our Database Model. We will be storing data in our model from our API.

`name: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`asset_owner: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`id: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`token_id: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`image_url: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`traits: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`collection: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.ENUM([{`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`name: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`traits: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`banner_url: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`created_date: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;`slug: DataTypes.STRING,`  
&nbsp;&nbsp;`}])`  
`}`  
