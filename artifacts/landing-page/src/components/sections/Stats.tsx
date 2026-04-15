export function Stats() {
  return (
    <section id="stats" className="py-24 bg-card">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="font-display text-3xl md:text-5xl font-bold mb-6">Proven track record of shipping.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              We don't just write code, we build businesses. Our team has engineered solutions that handle millions of users, process millions in transactions, and leverage cutting-edge AI.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <p className="text-5xl font-display font-bold text-primary mb-2">50+</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Enterprise Projects</p>
              </div>
              <div>
                <p className="text-5xl font-display font-bold text-primary mb-2">12</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Industries Served</p>
              </div>
              <div>
                <p className="text-5xl font-display font-bold text-primary mb-2">99.9%</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Uptime Guaranteed</p>
              </div>
              <div>
                <p className="text-5xl font-display font-bold text-primary mb-2">$50M+</p>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">Processed Volumes</p>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 blur-3xl -z-10 rounded-full"></div>
            <div className="bg-background border border-border rounded-2xl p-8 shadow-2xl">
              <div className="space-y-6">
                {[
                  { title: "React & Next.js", progress: 95 },
                  { title: "Node.js & Python", progress: 90 },
                  { title: "AI/LLM Integration", progress: 85 },
                  { title: "Cloud Infrastructure", progress: 88 },
                ].map((skill, i) => (
                  <div key={i}>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.title}</span>
                      <span className="text-muted-foreground">{skill.progress}%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-primary to-accent" 
                        style={{ width: `${skill.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
