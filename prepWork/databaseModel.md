
# Database Model Schema

Below is our Database Model. We will be storing data in our model from our API.

&nbsp;&nbsp;`username: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;`required: true,`  
&nbsp;&nbsp;&nbsp;&nbsp;`unique: true,`  
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`password: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.STRING,`  
&nbsp;&nbsp;&nbsp;&nbsp;`required: true,`    
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`role: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.ENUM('user'),`  
&nbsp;&nbsp;&nbsp;&nbsp;`required: true,`  
&nbsp;&nbsp;&nbsp;&nbsp;`defaultValue: 'user',`    
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`follows: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.ARRAY(DataTypes.STRING),`  
&nbsp;&nbsp;&nbsp;&nbsp;`required: false,`    
&nbsp;&nbsp;`},`  
&nbsp;&nbsp;`likes: {`  
&nbsp;&nbsp;&nbsp;&nbsp;`type: DataTypes.ARRAY(DataTypes.STRING),`  
&nbsp;&nbsp;&nbsp;&nbsp;`required: false,`  
&nbsp;&nbsp;`}`  
