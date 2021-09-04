<?php

namespace App\DataFixtures;

use App\Entity\Usuarios;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\Security\Core\Encoder\UserPasswordEncoderInterface;
use Symfony\Component\Security\Core\Validator\Constraints\UserPassword;

class UserFixture extends Fixture
{
    private $encoder;
    public function __construct(UserPasswordEncoderInterface $encoder){
        $this->encoder = $encoder;
    }
    public function load(ObjectManager $manager)
    {
        $user = new Usuarios();
        $user->setUsername('admin');
        $user->setPassword($this->encoder->encodePassword($user,'admin'));
        $user->setEmail('jcarrielroca98@gmail.com');
        $manager->persist($user);
        $manager->flush();
    }
}
