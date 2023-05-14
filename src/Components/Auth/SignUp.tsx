import { useRouter } from "next/router";
import styles from '@/styles/signup.module.css'
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import axios from "axios";

export default function SignUp() {
  const router = useRouter();

  const schema = yup.object({
    name: yup.string().max(200).required(),
    email: yup.string().email().max(100).required(),
    password: yup.string().required(),
    bio: yup.string().notRequired()
}).required();


type FormData = yup.InferType<typeof schema>;
  const { handleSubmit , register , formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(schema)
  });

  
  const onSubmit = async (data : FormData) => {
    try {
      await axios.post('http://localhost:8080/users', data);
      console.log(data);
      router.push('/')
    } catch (error) {
       console.log(errors);
    }
  } 

    return ( 
        <>
           <div className={styles.formcontainer}>
              <h1>Sign Up</h1>
              <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
                <input type="text" 
                placeholder="Name" 
                className={styles.input}  
                {...register("name",{required: true})}
                />
                <p>{errors.name?.message}</p>
                
                <input type="email" 
                placeholder="Email" 
                className={styles.input} 
                {...register("email",{required: true})}
                />
                <p>{errors.email?.message}</p>

                <input type="password" 
                placeholder="Password" 
                className={styles.input} 
                {...register("password",{required: true})}
                />
                <p>{errors.password?.message}</p>

                <input type="text" 
                placeholder="Bio" 
                className={styles.input} 
                {...register("bio")}
                />
                <p>{errors.bio?.message}</p>

                <button type="submit">Sign Up</button>
              </form>
           </div>
        </>
    )
}