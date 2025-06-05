import { Button, ButtonText } from "@/components/ui/button";
import { FormControl } from "@/components/ui/form-control";
import { Heading } from "@/components/ui/heading";
import { Input, InputField, InputIcon, InputSlot } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { EyeIcon, EyeOffIcon } from "@/components/ui/icon";
import React, { useState } from "react";
import { HStack } from "@/components/ui/hstack";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/api/auth";
import { useAuth } from "@/store/authStore";
import { Redirect } from "expo-router";
	
export default function LoginScreen() {
          const [showPassword, setShowPassword] = useState(false);
          // i have to get the initial data and then set the data
          const [email, setEmail] = useState("");
          const [password, setPassword] = useState("")

          // here set the token and user
          const setUser = useAuth((state : any) => state.setUser)
          const setToken = useAuth((state : any) => state.setToken)
          const isLoggedIn = useAuth((state : any) => !!state.token)

          // instead of using useQuery which is to get data, i should use useMutation to send data
          const loginMutation = useMutation({ 
            mutationFn: () => login(email, password),
            // get the data in the onSuccess
            onSuccess: (data)=> {
                console.log("success", data)
                // store the user and token
                if (data.user && data.token) {
                    setUser(data.user)
                    setToken(data.token)
                }
            },
            onError: () => {console.log("Could not login");
            }
        })

        const handleState = () => {
        setShowPassword((showState) => {
            return !showState;
        });
        };

        if (isLoggedIn) {
            return <Redirect href={'/'} />
        }
        return (
            <FormControl 
                isInvalid = {loginMutation.isError}
                className="p-4 border rounded-lg max-w-[560px] border-outline-300 m-2 bg-white">
              <VStack space="xl">
                <Heading className="text-typography-900 pt-3">Login</Heading>
                <VStack space="xs">
                  <Text className="text-typography-500">Email</Text>
                  <Input className="min-w-[250px]">
                    <InputField type="text" value={email} onChangeText={setEmail} />
                  </Input>
                </VStack>
                <VStack space="xs">
                  <Text className="text-typography-500">Password</Text>
                  <Input className="text-center">
                    <InputField value={password} onChangeText={setPassword} type={showPassword ? "text" : "password" } />
                    <InputSlot className="pr-3" onPress={handleState}>
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                      />
                    </InputSlot>
                  </Input>
                </VStack>
                <HStack space="sm">
                <Button
                  className="flex-1"
                  onPress={() => loginMutation.mutate()}
                  variant="outline">
                  <ButtonText>Login</ButtonText>
                </Button>
                <Button
                  className="flex-1" 
                  onPress={() => {}}>
                  <ButtonText>Signup</ButtonText>
                </Button>
                </HStack>
              </VStack>
            </FormControl>
          );
        }