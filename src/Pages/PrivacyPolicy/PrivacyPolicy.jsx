import React from 'react';
import './PrivacyPolicy.css';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
    return (
        <div className="privacy-policy">
            <h1>Política de Privacidade</h1>

            <p>Esta Política de Privacidade descreve como suas informações pessoais são coletadas, usadas e protegidas ao utilizar este protótipo.</p>

            <h2>1. Informações Coletadas</h2>
            <p>
                Ao utilizar o aplicativo, poderemos coletar as seguintes informações:
            </p>
            <ul>
                <li>Nome</li>
                <li>Endereço de e-mail</li>
                <li>Imagem de perfil (caso use login via Google ou outro provedor)</li>
                <li>Preferências e interações salvas no navegador via <code>localStorage</code></li>
            </ul>
            <p>
                Essas informações são fornecidas voluntariamente por você no momento do login ou uso do aplicativo.
            </p>

            <h2>2. Uso das Informações</h2>
            <p>As informações coletadas são utilizadas para:</p>
            <ul>
                <li>Identificar o usuário no sistema</li>
                <li>Exibir conteúdo personalizado (como nome e foto)</li>
                <li>Melhorar a experiência de uso</li>
                <li>Garantir funcionalidades básicas do app</li>
            </ul>
            <p>Não utilizamos suas informações para fins comerciais nem as compartilhamos com terceiros.</p>

            <h2>3. Armazenamento dos Dados</h2>
            <p>As informações são armazenadas de duas formas:</p>
            <ul>
                <li><strong>LocalStorage</strong> do navegador, utilizado apenas no seu dispositivo</li>
                <li><strong>Firebase Authentication</strong>, onde seu nome, e-mail e foto de perfil são tratados conforme os Termos de Serviço e Política de Privacidade do Google</li>
            </ul>

            <h2>4. Compartilhamento de Dados</h2>
            <p>Seus dados não são compartilhados com terceiros.</p>

            <h2>5. Segurança</h2>
            <p>Implementamos medidas de segurança apropriadas para proteger seus dados pessoais no protótipo. No entanto, nenhum sistema é 100% seguro, por isso recomendamos não compartilhar informações sensíveis no aplicativo.</p>

            <h2>6. Seus Direitos</h2>
            <p>Você pode:</p>
            <ul>
                <li>Excluir sua conta e todas as informações associadas diretamente na área de perfil do aplicativo</li>
                <li>Revogar o acesso ao app a qualquer momento</li>
                <li>Gerenciar suas informações diretamente pela conta Google (caso tenha feito login por lá)</li>
            </ul>
        
            <Link to="/">
                Voltar
            </Link>
        </div>
    );
}
