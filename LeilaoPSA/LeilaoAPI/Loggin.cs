﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;

namespace LeilaoAPI
{
    public class Loggin
    {
        public Loggin()
        {

        }

        public void criarMensagem(Exception ex)
        {
            string message = string.Format("Time: {0}", DateTime.Now.ToString("dd/MM/yyyy hh:mm:ss tt"));
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;
            message += string.Format("Message: {0}", ex.Message);
            message += Environment.NewLine;
            message += string.Format("StackTrace: {0}", ex.StackTrace);
            message += Environment.NewLine;
            message += string.Format("Source: {0}", ex.Source);
            message += Environment.NewLine;
            message += string.Format("TargetSite: {0}", ex.TargetSite.ToString());
            message += Environment.NewLine;
            message += "-----------------------------------------------------------";
            message += Environment.NewLine;

            string filePath = System.Web.Hosting.HostingEnvironment.ApplicationPhysicalPath;
            filePath = (filePath + @"App_Data\Log.txt");
            string path = Convert.ToString(filePath);
            File.AppendAllText(path, message);
            
        }
    }
}