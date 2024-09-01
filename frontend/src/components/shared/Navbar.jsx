import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const Navbar = () => {

    const user = false;


  return (
    <div className='bg-white'>

        <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>

            <div>
                <h1 className='text-2xl font-bold'>Job<span className='text-[#f83002]'>Portal</span></h1>
            </div>

            <div className='flex items-center gap-12'>
                <ul className='flex font-medium items-center gap-5'>
                    <li>Home</li>
                    <li>Jobs</li>
                    <li>Browse</li>
                </ul>

                {
                    !user ? (
                        <div className='flex items-center gap-3'>
                            <Link to='/login'><Button variant='outline' className='rounded'>Login</Button></Link>
                            <Link to='/signup'><Button className='bg-purple-700 text-white hover:bg-purple-800 rounded'>Signup</Button></Link>
                        </div>
                    )
                    :
                    (
                        <Popover>

                            <PopoverTrigger>
                                <Avatar className="cursor-pointer">
                                    <AvatarImage src="https://github.com/shadcn.png" />
                                </Avatar>
                            </PopoverTrigger>
        
                            <PopoverContent className="w-80">
                                <div>
                                    <div className='flex gap-2 space-y-2'>
                                        <Avatar className="cursor-pointer">
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                        </Avatar> 
                                        <div>
                                            <h4 className='font-medium'>Moto</h4>
                                            <p className='text-sm text-muted-foreground'>Hey, I'm Moto!</p>
                                        </div>
                                    </div>
        
                                    <div className='flex flex-col my-2 text-gray-600'>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <User2/>
                                            <Button variant="link">View Profile</Button>
                                        </div>
                                        <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                            <LogOut/>
                                            <Button variant="link">Logout</Button>
                                        </div>
                                    </div>
                                </div>
                            </PopoverContent>
    
                        </Popover>
                    )
                }

            </div>

        </div>

    </div>
  )
}

export default Navbar

